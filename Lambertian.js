const Material = require('./Material');
const { randomUnitVector } = require('./Util');
const Ray = require('./ray');
const Vector3 = require('./vec3');

module.exports = class Lambertian extends Material {
    constructor(color) {
        super();
        this.albedo = color;
    }

    /**
     * @param {Ray} rayIn
     * @param {HitResult} hitRecord
     * @returns {ScatterReturn}
     */
    scatter(rayIn, hitRecord) {
        let scatterDirection = hitRecord.normal.add(Vector3.randomUnitVector());
        if(scatterDirection.nearZero()) scatterDirection = hitRecord.normal;
        return {
            doScatter: true,
            attenuation: this.albedo,
            scattered: new Ray(hitRecord.point, scatterDirection),
        };
    }
};
