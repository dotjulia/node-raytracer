const Vector3 = require('./vec3');
const Ray = require('./ray');

module.exports = class Camera {
    constructor(width, height, samples) {
        const aspect_ratio = width / height;
        const viewport_height = 2.0;
        const viewport_width = aspect_ratio * viewport_height;
        const focal_length = 1.0;

        this.origin = new Vector3(0,0,0);
        this.horizontal = new Vector3(viewport_width, 0, 0);
        this.vertical = new Vector3(0, viewport_height, 0);
        this.samples = samples;
        this.maxDepth = 25;
        this.lower_left_corner = this.origin.minus(this.horizontal.divN(2)).minus(this.vertical.divN(2)).minus(new Vector3(0, 0, focal_length));
    }

    assignFromObject(obj) {
        this.origin = new Vector3().assignFromObj(obj.origin);
        this.lower_left_corner = new Vector3().assignFromObj(obj.lower_left_corner);
        this.vertical = new Vector3().assignFromObj(obj.vertical);
        this.horizontal = new Vector3().assignFromObj(obj.horizontal);
        this.samples = obj.samples;
        this.maxDepth = obj.maxDepth;
        return this;
    }

    getRay(u, v) {
        return new Ray(this.origin, this.lower_left_corner.add(this.horizontal.mulN(u)).add(this.vertical.mulN(v)).minus(this.origin));
    }
};
