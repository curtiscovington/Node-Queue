# Queues

This is a quick demonstration of bull queues.

Assumes redis is running locally.

Run worker process
`$ node src/worker.js`

and then
`$ npm start`

to run the server.

Making a POST `http://localhost:3000/jobs` with a json request
```json
{
    "url": "http://www.google.com/images/srpr/logo11w.png"
}
```

will add a job to the bull priority queue which will be picked up by the worker.

GET `http://localhost:3000/job/:id` will return the job.

The worker process will attempt to resize the image, and then discard it.

The worker process will fail approximately 1 in 3 times with a simulated process death using 
```javascript 
process.exit(0);
```

The worker process is unaffected. Processes only run once.
