require("dotenv").config();

const keys = require('./keys.js');
const axios = require('axios');
var bandsintown = require('bandsintown')('codingbootcamp');

const commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
let authCommand = 'placeHolder';
if (commands.includes(process.argv[2])) {
    authCommand = process.argv[2];
}
else {
    alert('Choose approve command');
};

// if (authCommand == 'concert-this') {
//     const artist = process.argv[3];
//     axios({
//         method: 'get',
//         url: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp",
//         responseType: 'stream'
//     })
//         .then(function (response) {
//             console.log(response);
//         });
// }

if (authCommand == 'concert-this') {
    const artist = process.argv[3];
    
    bandsintown
        .getArtistEventList('Skrillex')
        .then(function (events) {
            // return array of events
            console.log(events);
        });
}