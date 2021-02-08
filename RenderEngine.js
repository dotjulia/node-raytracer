const Color = require('./color.js');
const Ray = require('./ray.js');
const Vector3 = require('./vec3.js');
const Camera = require('./Camera');

const { Worker } = require('worker_threads');

/**
 * @returns Number - render time
 */
module.exports = async (out) => {
    const camera = new Camera(out.width, out.height, 500);
    const start = new Date();
    const pixelRenderChunks = [];
    for(let y = 0; y < out.height; y++) {
        const pixelRow = [];
        for(let x = 0; x < out.width; x++) {
            pixelRow.push({x,y});
        }
        pixelRenderChunks.push({pixels: pixelRow, id: y});
    }
    let chunksFinished = 0;
    initWorkerThreads(32, (chunk) => {
        out.pushPixelRow(out.height-chunk.id-1, chunk.pixels); // for some reasons it's upside down i think it's because of the png library
        chunksFinished++;
    });
    for(const chunk of pixelRenderChunks) {
        delegateToWorkerThread(chunk, out, camera);
    }

    const finishCondition = () => {
        return chunksFinished >= out.height;
    };
    finishCondition.toProgressString = () => `${chunksFinished}/${out.height}`;
    await waitForWorkers(finishCondition, 1000);

    terminateWorkerThreads();
    return new Date() - start;
};

/**
 *
 * @param workerFinishCondition - function that returns true or false, and optionally a .toProgressString() function
 * @param {int} checkIntervalMS
 * @returns {Promise}
 */
function waitForWorkers(workerFinishCondition, checkIntervalMS) {
    return new Promise((res, rej) => {
        const waitForFinish = () => {
            if(!workerFinishCondition()) {
                console.log(workerFinishCondition.toProgressString());
                setTimeout(waitForFinish, checkIntervalMS);
            } else {
                console.log(workerFinishCondition.toProgressString());
                res();
            }
        };
        setTimeout(waitForFinish, checkIntervalMS);
    });
}



let workerThreads = [];
function initWorkerThreads(num, handleReturnChunk) {
    workerThreads = [];
    for(let i = 0; i < num; i++) {
        const worker = new Worker('./RenderPixelWorker.js');
        workerThreads.push(worker);
        worker.on('message', handleReturnChunk);
    }
}

function terminateWorkerThreads() {
    for(const worker of workerThreads) {
        worker.terminate();
    }
}

let nextWorkerThreadToUse = 0;
function delegateToWorkerThread(chunk, out, camera) {
    workerThreads[nextWorkerThreadToUse].postMessage({pixelsToRender: chunk, width: out.width, height: out.height, camera});
    nextWorkerThreadToUse++;
    if(nextWorkerThreadToUse >= workerThreads.length) {
        nextWorkerThreadToUse = 0;
    }
}
