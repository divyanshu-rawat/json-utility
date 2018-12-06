const promisify = require("promisify-node");
const fs = promisify("fs");
const csv = require("csvtojson");
const csvFilePath = "./csvInput/csv_data.csv";

csv()
   .fromFile(csvFilePath)
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
      fs.writeFile(
         "./jsonOutput/output.json",
         JSON.stringify(json, null, 4),
         err => {
            if (err) {
               console.error(err);
               return;
            }
         }
      ).then(() => {
         console.log("Hurray! JSON Generated");

         const fs = require("fs");
         const Json2csvTransform = require("json2csv").Transform;
         const transformOpts = { highWaterMark: 16384, encoding: "utf-8" };

         const input = fs.createReadStream("./jsonOutput/output.json", {
            encoding: "utf8"
         });
         const output = fs.createWriteStream("./csvOutput/output.csv", {
            encoding: "utf8"
         });
         const json2csv = new Json2csvTransform(transformOpts);
         const processor = input.pipe(json2csv).pipe(output);

         console.log("Hurray! CSV Generated");
      });
   });

// You can also listen for events on the conversion and see how the header or the lines are coming out.
