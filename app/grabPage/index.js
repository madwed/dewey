var request = require("request-promise");
var inlineCss = require("inline-css");
var sanitize = require("sanitize-html");
var htmlparser = require("htmlparser2");
var imguri = require("./imguriplus");


var findDomain = (path) => {
    var pathArray = path.split("/");
    return pathArray[0] + "//" + pathArray[2] + "/";
};

var mergeStyles = (html, url) => {
    return new Promise((resolve, reject) => {
        inlineCss(html, {url: url}, function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

var extractScripts = (html) => {
    var httpReg = /https?:\/\//i;
    //Clean out the scripts
    return sanitize(html, {
        allowedTags: false,
        allowedAttributes: false,
        exclusiveFilter: (frame) => {
            switch (frame.tag) {
                case "script":
                    return true;
                case "img":
                    return httpReg.test(frame.attribs.src);
            }
        }
    });
};

var grabImages = (html, domain) => {
    var srcs = [];
    var parser = new htmlparser.Parser({
        onopentag: (name, attribs) => {
            if (name === "img" && attribs.src) {
                srcs.push(attribs.src);
            }
        }
    });
    //Turn the images into data uris
    parser.write(html);
    //grab all the image srcs in here
    parser.end();
    //call imguri with a promise to get the base64s of the images
    return Promise.all([html, new Promise((resolve, reject) => {
        imguri.encode(srcs, {force: true, url: domain}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            }
        )
    })]);
};

var mergeImages = (data) => {
    var html = data[0];
    var srcs = data[1];
    var path, img;
    for (path in srcs) {
        img = srcs[path];
        if (img.err) {
            html = html.replace(img.base, "#");
            console.log(img.err);
        } else {
            html = html.replace(img.base, img.data);
        }
    }
    return html;
};

var setBodyStyle = (html) => {
    var appStyle = {
        "width": "100%",
        "overflow-x": "hidden",
        "min-width": "100%",
        "max-width": "100%",
        "margin": "0"
    };
    var bodyReg = /<body.*?>/;
    var body = bodyReg.exec(html);
    var styleReg = /style="(.*?)"/;
    var style = styleReg.exec(body[0]);
    // console.log(body, style);    
    var matchLength = body[0].length;
    var styleProps = [];
    if(style){
        styleProps = style[1].split(";");
        styleProps = styleProps.map((property) => {
            //set styles if they're there
            property = property.split(":");
            property[0] = property[0].trim();
            property[1] = property[1].trim();
            if(appStyle[property[0]]){
                property[1] = appStyle[property[0]];
                delete appStyle[property[0]];
            }
            return property.join(":");
        });
    }
    styleProps = styleProps.concat(Object.keys(appStyle)
        .map((key) => `${key}:${appStyle[key]}`)).join(";");
    var bodyTag;
    var styleTag = `style="${styleProps}"`;
    if(style){
        bodyTag = body[0].replace(styleReg, styleTag);
    }else{
        bodyTag = body[0].slice(0, -1) + " " + styleTag + ">"
    }
    return html.slice(0, body.index) + bodyTag + html.slice(body.index + matchLength);
};


var grabPage = (url) => {
    var domain = findDomain(url);
    //Get the page
    return request(url)
        .then((html) => {
            //Inline the css
            return mergeStyles(html, url);
        }).then((html) => {
            return extractScripts(html);
        }).then((html) => {
            return grabImages(html, domain);
        }).then((data) => {
            //Apply the base64s
            var html = mergeImages(data);
            return setBodyStyle(html);
        }).catch((err) => {
            throw Error(err);
        });
};

module.exports = grabPage;
