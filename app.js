const promisify = require("promisify-node");
const promisifyloadJsonFile = promisify("load-json-file");
var fs = promisify("fs");

promisifyloadJsonFile("data.json")
   .then(json => {
      for (let j = 0; j < json.length; j++) {
         json[j].location = {
            lat: json[j].Latitude,
            lang: json[j].Longitude
         };
      }
      return json;
   })
   .then(json => {
      for (let j = 0; j < json.length; j++) {
         json[j].location = {
            lat: json[j].Latitude,
            lang: json[j].Longitude
         };
         delete json[j]["Latitude"];
         delete json[j]["Longitude"];
      }

      return json;
   })
   .then(json => {
      fs.writeFile("./object.json", JSON.stringify(json, null, 4), err => {
         if (err) {
            console.error(err);
            return;
         }
      }).then(function() {
         console.log("Hurray! Operation Completed");
      });
   });
