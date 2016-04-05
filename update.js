var del     = require("del");
var request = require("request");
var fs      = require("fs");

//Clear the source folder
del.sync(["source/"]);

//Creates the dir
fs.mkdirSync("source/");

//Load package json
var pkg = require("./package.json");

//Assert
var l = pkg.sources==null ? [] : pkg.sources;

//Loads the source code using the informed url.
function loadSource(p_url) {
    
    var url = p_url;
    var fn  = url.split("/").pop();
    
    url = url +"?r="+Math.random()*100000.0;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("update> ["+fn+"] loaded!");            
            fs.writeFileSync("./source/"+fn,body); 
        }
    });    
    
}

//For each source download it
for(var i=0; i<l.length; i++) loadSource(l[i]);
