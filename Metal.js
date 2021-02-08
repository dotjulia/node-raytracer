const Material = require('./Material');
const Ray = require('./Ray');

module.exports = class Metal extends Material {
    /**
     * @param {Vector3} color
     */
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
        let reflected;
        try {
            reflected = rayIn.direction.unitVector().reflect(hitRecord.normal);
        }catch(e) {
            console.log(hitRecord.normal);
        }
        const scattered = new Ray(hitRecord.point, reflected);
        return {
            doScatter: scattered.direction.dot(hitRecord.normal) > 0,
            scattered,
            attenuation: this.albedo,
        };
    }
};
