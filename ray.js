const Vector3 = require('./vec3.js');

module.exports = class Ray {
    /**
     * @param origin - vec3
     * @param direction - vec3
     */
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    at(t) {
        return this.origin.add(this.direction.mulN(t));
    }
};
