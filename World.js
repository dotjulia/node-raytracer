const HittableList = require('./HittableList');
const Sphere = require('./Sphere');
const Vector3 = require('./vec3');

class World {
    constructor() {
        this.worldHittableList = new HittableList();
        this.worldHittableList.add(new Sphere(new Vector3(0,0,-1), 0.5));
        this.worldHittableList.add(new Sphere(new Vector3(0,-100.5,-1), 100));
    }
}

module.exports = new World();
