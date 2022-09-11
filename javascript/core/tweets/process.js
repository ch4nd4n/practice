const wfh = require('./backtowork_2.json');

let tweets = wfh.data.map(tweet => { return [tweet.id, tweet.text ] });

console.log(tweets.join('\n'));
