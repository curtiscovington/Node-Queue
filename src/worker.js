const throng = require('throng');
const Queue = require('bull');



const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const workers = process.env.WEB_CONCURRENCY || 2;

const maxJobsPerWorker = 50;

function start() {
    const processQueue = new Queue('processQueue', REDIS_URL);

    processQueue.process(maxJobsPerWorker, `${__dirname}/processor.js`);


}

throng({workers, start});