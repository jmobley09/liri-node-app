// required modules
require("dotenv").config();
const keys = require('./keys.js');
const axios = require('axios');
const Spotify = require('node-spotify-api');

// list of approved commands to be used
const commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
let authCommand = 'placeHolder';

// if the command entered into terminal is not on approved list gives error
if (commands.includes(process.argv[2])) {
    authCommand = process.argv[2];
}
else {
    console.log('Choose approved command');
};

// Bands in Town api call -- works with the 'concert-this' command
if (authCommand == 'concert-this') {
    const artist = process.argv[3];
    axios({
        method:'get',
        url:"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
      })
        .then(function(response) {
            console.log('Name: ' + response.data[0].venue.name + '\nLocation: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country + '\nDate: ' + response.data[0].datetime);
      });
}

// Spotify API call -- works with the 'spotify-this-song' command
else if(authCommand == 'spotify-this-song') {
    const spotify = new Spotify(keys.spotify);
       
      spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

// OMDB API call -- works with the 'movie-this' command
else if(authCommand == 'movie-this') {
    let movie = "";
    const nodeArgs = process.argv;
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movie = movie + "+" + nodeArgs[i];
        }
        else {
            movie += nodeArgs[i];
      
        }
      }
    
    axios({
        method:'get',
        url:"http://www.omdbapi.com/?apikey=trilogy&t=" + movie
      })
        .then(function(response) {
            rating = response.data.Ratings[1].Value;
            console.log('\nTitle: ' + response.data.Title + '\nRelease Date: ' + response.data.Released + '\nIMDb Rating: ' + response.data.imdbRating + "\nRotten Tomatoes Score: " + rating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors + '\n');
      });
}
