const {workerData, parentPort } = require('worker_threads');

const Camera = require('./Camera');
const Color = require('./color.js');
const Ray = require('./ray.js');
const Vector3 = require('./vec3.js');
const Sphere = require('./Sphere');
const world = require('./World');
const { clamp, randomNumber } = require('./Util');

function ray_color(ray, depth) {
    //const t = testSphere.hit(ray);
    const hRec = world.worldHittableList.hit(ray, 0.001, Number.POSITIVE_INFINITY);
    if (depth <= 0) return new Vector3(0,0,0);
    if (hRec.hit) {
        //const target = hRec.point.add(hRec.normal).add(Vector3.randomUnitVector());
        //const target = hRec.point.add(Vector3.randomInHemisphere(hRec.normal));
        const { attenuation, doScatter, scattered } = hRec.material.scatter(ray, hRec);
        if(doScatter) return attenuation.mulV(ray_color(scattered, depth-1));
        return new Vector3(0,0,0);
        //return ray_color(new Ray(hRec.point, target.minus(hRec.point)), depth-1).mulN(0.5);
        //return hRec.normal.add(new Vector3(1,1,1)).mulN(0.5);
    }

    const unit_direction = ray.direction.unitVector();
    const tbg = 0.5 * (unit_direction.y + 1.0);
    return new Vector3(1.0,1.0,1.0).mulN(1.0-tbg).add(new Vector3(0.5,0.7,1.0).mulN(tbg));
}

function renderPixel(camera) {
    let color = new Vector3(0,0,0);
    for(let s = 0; s < camera.samples; s++) {
        const u = (this.x + randomNumber()) / (this.width - 1);
        const v = (this.y + randomNumber()) / (this.height - 1);
        //const r = new Ray(camera.origin, camera.lower_left_corner.add(camera.horizontal.mulN(u)).add(camera.vertical.mulN(v)).minus(camera.origin));
        const r = camera.getRay(u, v);
        color = color.add(ray_color(r, camera.maxDepth));
    }
    this.color(color.x, color.y, color.z, 1.0, camera.samples);
}

parentPort.on('message', message => {
    const pixelsToRender = message.pixelsToRender;

    message.camera = new Camera(0,0).assignFromObject(message.camera);

    const retPixelChunk = [];
    for(const pixel of pixelsToRender.pixels) {
        renderPixel.bind({
            x: pixel.x,
            y: pixel.y,
            width: message.width,
            height:message.height,
            color: (r, g, b, a, samplesByPixel) => {
                //workerData.out.setPixel(workerData.x,workerData.y,new Color(r,g,b, a || 1.0));
                const scale = 1.0 / samplesByPixel;
                //gamma correction for gamma = 2
                r = Math.sqrt(scale * r);
                g = Math.sqrt(scale * g);
                b = Math.sqrt(scale * b);
                a = 1.0;
                r = clamp(r, 0.0, 0.9999);
                g = clamp(g, 0.0, 0.9999);
                b = clamp(b, 0.0, 0.9999);
                //a = clamp(a, 1.0, 1.0);
                retPixelChunk.push(new Color(r,g,b,a || 1.0));
            },
        })(message.camera);
    }
    parentPort.postMessage({id: pixelsToRender.id, pixels: retPixelChunk});
});
