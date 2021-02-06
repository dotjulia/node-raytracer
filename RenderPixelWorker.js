const {workerData, parentPort } = require('worker_threads');

const Color = require('./color.js');
const Ray = require('./ray.js');
const Vector3 = require('./vec3.js');
const Sphere = require('./Sphere');
const world = require('./World');

function ray_color(ray) {
    //const t = testSphere.hit(ray);
    const hRec = world.worldHittableList.hit(ray, 0, Number.POSITIVE_INFINITY);
    if (hRec.hit) {
        return hRec.normal.add(new Vector3(1,1,1)).mulN(0.5);
    }

    // if(t > 0.0) {
    //     const normal = ray.at(t).minus(new Vector3(0,0,-1)).unitVector();
    //     return new Vector3(normal.x + 1, normal.y + 1, normal.z + 1).mulN(0.5);
    // }
    const unit_direction = ray.direction.unitVector();
    const tbg = 0.5 * (unit_direction.y + 1.0);
    return new Vector3(1.0,1.0,1.0).mulN(1.0-tbg).add(new Vector3(0.5,0.7,1.0).mulN(tbg));
}

function renderPixel(camera) {
    const u = this.x / (this.width-1);
    const v = this.y / (this.height-1);
    const r = new Ray(camera.origin, camera.lower_left_corner.add(camera.horizontal.mulN(u)).add(camera.vertical.mulN(v)).minus(camera.origin));
    const color = ray_color(r);
    this.color(color.x, color.y, color.z);
}

parentPort.on('message', message => {
    const pixelsToRender = message.pixelsToRender;

    message.camera.origin = new Vector3().assignFromObj(message.camera.origin);
    message.camera.lower_left_corner = new Vector3().assignFromObj(message.camera.lower_left_corner);
    message.camera.vertical = new Vector3().assignFromObj(message.camera.vertical);
    message.camera.horizontal = new Vector3().assignFromObj(message.camera.horizontal);

    const retPixelChunk = [];
    for(const pixel of pixelsToRender.pixels) {
        renderPixel.bind({
            x: pixel.x,
            y: pixel.y,
            width: message.width,
            height:message.height,
            color: (r,g,b, a) => {
                //workerData.out.setPixel(workerData.x,workerData.y,new Color(r,g,b, a || 1.0));
                retPixelChunk.push(new Color(r,g,b,a || 1.0));
            },
        })(message.camera);
    }
    parentPort.postMessage({id: pixelsToRender.id, pixels: retPixelChunk});
});
