const express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const redis = require("redis");
const redisUrl = process.env.REDIS_URL || "redis://localhost";
const client = redis.createClient(redisUrl);

client.on("error", function(error) {
    console.error({error});
}).on("connection", (stream) => {
    console.log("connected")
});

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/entries', jsonParser, (req, res) => {
    console.log(req.body);
    client.set("entries", JSON.stringify(req.body), (err, reply) => {
        console.log({ err, reply })
        res.status(201)
        res.send({ success: true, reply })
     })
})

app.get('/api/entries', jsonParser, (req, res) => {
    client.GET("entries", (err, reply) => {
        console.log({err, reply});
        res.send({ reply })
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})