const Vector3 = require('./vec3');
const Ray = require('./ray');

module.exports = class Camera {
    /**
     * @param {Number} width
     * @param {Number} height
     * @param {Number} samples
     * @param {Number} vfov
     * @param {Vector3} lookfrom - point
     * @param {Vector3} lookat - point
     * @param {Vector3} vup - direction
     */
    constructor(width, height, samples, vfov, lookfrom, lookat, vup) {
        if(!lookfrom || !lookat || !vup || !vfov) return; // camera probably initialized for later use with assignFromObject
        const theta = vfov * (Math.PI/180);
        const h = Math.tan(theta/2);
        const aspect_ratio = width / height;
        const viewport_height = 2.0 * h;
        const viewport_width = aspect_ratio * viewport_height;

        const w = lookfrom.minus(lookat).unitVector();
        const u = vup.cross(w).unitVector();
        const v = w.cross(u);

        this.origin = lookfrom;
        this.horizontal = u.mulN(viewport_width);
        this.vertical = v.mulN(viewport_height);
        this.samples = samples;
        this.maxDepth = 10;
        this.lower_left_corner = this.origin.minus(this.horizontal.divN(2)).minus(this.vertical.divN(2)).minus(w);
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

    getRay(s, t) {
        return new Ray(this.origin, this.lower_left_corner.add(this.horizontal.mulN(s)).add(this.vertical.mulN(t)).minus(this.origin));
    }
};
