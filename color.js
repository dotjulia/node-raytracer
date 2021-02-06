const Vector3 = require('./vec3.js');

module.exports = class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    map(maxValue, channels) {
        const retArr = [];
        if(channels > 0) retArr.push(this.r * maxValue);
        if(channels > 1) retArr.push(this.g * maxValue);
        if(channels > 2) retArr.push(this.b * maxValue);
        if(channels > 3) retArr.push(this.a * maxValue);
        return retArr;
    }
    getVector() {
        return new Vector3(this.r, this.g, this.b);
    }
};
