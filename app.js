const loadJsonFile = require('load-json-file');
const fs = require('fs');

loadJsonFile('data.json').then(json => {

    for (let j = 0; j < json.length; j++) {
        json[j].location = {
            'lat': json[j].Latitude,
            'lang': json[j].Longitude
        }
    }
    fs.writeFile("./object.json", JSON.stringify(json, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File Created");
    });

});