const Material = require('./Material');
const Vector3 = require('./vec3');
const Ray = require('./ray');
const { randomNumber } = require("./Util");

module.exports = class Dielectric extends Material {
    constructor(ior) {
        super();
        this.ior = ior;
    }

    reflectance(cosine, refIdx) {
        let r0 = (1-refIdx) / (1+refIdx);
        r0 = r0 * r0;
        return r0 + (1-r0) * Math.pow((1-cosine),5);
    }

    /**
     * @param {Ray} rayIn
     * @param {HitResult} hitRecord
     * @returns {ScatterReturn}
     */
    scatter(rayIn, hitRecord) {
        const refractionRatio = hitRecord.frontFace ? (1.0/this.ior) : this.ior;

        const unitDirection = rayIn.direction.unitVector();

        const cosTheta = Math.min(unitDirection.mulN(-1).dot(hitRecord.normal), 1.0);
        const sinTheta = Math.sqrt(1.0 - cosTheta*cosTheta);

        let direction;
        if((refractionRatio * sinTheta) > 1.0 || this.reflectance(cosTheta, refractionRatio) > randomNumber()) {
            direction = unitDirection.reflect(hitRecord.normal);
        } else {
            direction = unitDirection.refract(hitRecord.normal, refractionRatio);
        }

        return {
            doScatter: true,
            attenuation: new Vector3(1.0, 1.0, 1.0),
            scattered: new Ray(hitRecord.point, direction),
        };
    }
};
