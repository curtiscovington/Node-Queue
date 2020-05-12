const jimp = require('jimp');

// sandbox process to avoid interruptions with the worker process 
module.exports = function(job, done) {
    if (job.attemptsMade > 0) {
        done(true);
    }

    if (Math.floor(Math.random() * 3) === 2) {
        // Process dies 1 in 3 times
        process.exit(0);
    }

    // Read in the image
    jimp.read(job.data.url)
        .then(image => {
            image.resize(100, 100);

            // Store in s3? Return result?
            
            done(false);
        })
        .catch(err => {
            // ignore image error
            done(true);
        });
}