const HittableList = require('./HittableList');
const Sphere = require('./Sphere');
const Vector3 = require('./vec3');
const Lambertian = require('./Lambertian');
const Metal = require('./Metal');
const Dielectric = require('./Dielectric');

class World {
    constructor() {
        const groundMat = new Lambertian(new Vector3(0.8, 0.8, 0.8));
        const centerMat = new Lambertian(new Vector3(0.1, 0.2, 0.5));
        const leftMat = new Dielectric(1.5);
        const matRight = new Metal(new Vector3(0.8, 0.6, 0.2), 0.0);

        this.worldHittableList = new HittableList();
        this.worldHittableList.add(new Sphere(new Vector3(0,-100.5,-1), 100, groundMat));
        this.worldHittableList.add(new Sphere(new Vector3(0.0, 0.0, -1.0), 0.5, centerMat));
        this.worldHittableList.add(new Sphere(new Vector3(-1.0, 0.0, -1.0), 0.5, leftMat));
        this.worldHittableList.add(new Sphere(new Vector3(-1.0, 0.0, -1.0), -0.4, leftMat));
        this.worldHittableList.add(new Sphere(new Vector3(1.0, 0.0, -1.0), 0.5, matRight));
    }
}

module.exports = new World();
