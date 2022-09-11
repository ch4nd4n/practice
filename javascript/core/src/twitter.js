const fetch = require('node-fetch');

function getTweets() {
    fetch('https://api.twitter.com/1.1/search/tweets.json?q=%23WFH', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAP%2F0gQAAAAAAJeu0kXX%2B%2FkEosQIaPVeBkH%2Bwzl0%3DGOIZCdC509hbrkkE9VLJ2kvpygZ8mtyI5VTYjjZfH3rL51zdPx'
        }
    }).then(r => r.json())
        .then(data => console.log(data))
}

getTweets();