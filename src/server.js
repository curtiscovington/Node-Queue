const express = require('express');
const Queue = require('bull');
const bodyParser = require('body-parser');
const HttpStatus = require('./http_status.js');


const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const processQueue = new Queue('processQueue', REDIS_URL);

const app = express();


// middleware
app.use(bodyParser.json());


// routes
app.post('/jobs', async (req, res) => {
    if (req.body.url) {
        const job = await processQueue.add({url: req.body.url});
        res.status(HttpStatus.Ok).json({jobId: job.id});
    } else {
        res.status(HttpStatus.BadRequest).json({error: "missing url parameter"});
    }
});

app.get('/job/:id', async (req, res) => {
    const id = req.params.id;
    const job = await processQueue.getJob(id);

    if (job === null) {
        res.status(HttpStatus.NotFound).end();
    } else {
        res.status(HttpStatus.Ok).json(job)
    }
    
});

module.exports = app;