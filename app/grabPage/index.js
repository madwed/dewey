var request = require("request-promise");
var inlineCss = require("inline-css");
var sanitize = require("sanitize-html");
var htmlparser = require("htmlparser2");
var imguri = require("./imguriplus");


var grabPage = (url) => {
    var findDomain = (path) => {
        var pathArray = path.split("/");
        return pathArray[0] + "//" + pathArray[2] + "/";
    };
    var domain = findDomain(url);
    //Get the page
    return request(url)
        .then((html) => {
            //Inline the css
            return new Promise((resolve, reject) => {
                inlineCss(html, {url: url}, function (err, data) {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        }).then((html) => {
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
        }).then((html) => {
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
        }).then((data) => {
            //Apply the base64s
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
        }).catch((err) => {
            throw Error(err);
        });
};

module.exports = grabPage;
