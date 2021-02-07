const { randomNumber } = require('./Util');

module.exports = class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static random(min, max) {
        if(min === undefined || max === undefined) {
            return new Vector3(randomNumber(), randomNumber(), randomNumber());
        } else {
            return new Vector3(randomNumber(min, max), randomNumber(min, max), randomNumber(min, max));
        }
    }

    static randomInUnitSphere() {
        while(true) {
            const p = Vector3.random(-1, 1);
            if(p.length_squared() < 1) return p;
        }
    }

    assignFromObj(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        return this;
    }

    invert() {
        return new Vector3(-this.x, -this.y, -this.z);
    }

    add(vec) {
        return new Vector3(vec.x + this.x, vec.y + this.y, vec.z + this.z);
    }

    mulV(vec) {
        return new Vector3(vec.x * this.x, vec.y * this.y, vec.z * this.z);
    }

    mulN(n) {
        return new Vector3(this.x * n, this.y * n, this.z * n);
    }

    divN(n) {
        return this.mulN(1/n);
    }

    length() {
        return Math.sqrt(this.length_squared());
    }

    length_squared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    dot(vec3) {
        return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
    }

    cross(vec3) {
        return new Vector3(this.y * vec3.z - this.z * vec3.y, this.z * vec3.x - this.x * vec3.z, this.x * vec3.y - this.y * vec3.z);
    }

    minus(vec3) {
        return new Vector3(this.x - vec3.x, this.y - vec3.y, this.z - vec3.z);
    }

    unitVector() {
        return this.divN(this.length());
    }
};
