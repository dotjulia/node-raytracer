const PNGOutput = require('./pngoutput.js');
const render = require('./RenderEngine.js');
const colors = require('colors');


const main = async () => {
    const image_width = 1920;
    const image_height = 1080;
    const out = new PNGOutput(image_width, image_height, 4);

    await out.init();

    const time = await render(out);

    out.save("test8.png");
    return {err: '', time};
};
const measureTime = ( async () => {
    console.log("Starting render!".green);
    const ret = await main();
    if(ret.err) {
        console.log(("Render failed: " + ret).red);
    } else {
        console.log(`Render finished in ${ret.time}ms`.green);
    }
})();
