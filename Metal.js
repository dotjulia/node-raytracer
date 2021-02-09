const Material = require('./Material');
const Ray = require('./ray');
const Vector3 = require('./vec3');

module.exports = class Metal extends Material {
    /**
     * @param {Vector3} color
     */
    constructor(color, fuzziness) {
        super();
        this.albedo = color;
        this.fuzziness = fuzziness < 1 ? fuzziness : 1;
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
        const scattered = new Ray(hitRecord.point, reflected.add(Vector3.randomInUnitSphere().mulN(this.fuzziness)));
        return {
            doScatter: scattered.direction.dot(hitRecord.normal) > 0,
            scattered,
            attenuation: this.albedo,
        };
    }
};
