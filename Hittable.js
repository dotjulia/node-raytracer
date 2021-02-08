/**
 * @typedef {Object} HitResult
 * @property {Boolean} hit
 * @property {Vector3} [point];
 * @property {Vector3} [normal];
 * @property {Number} [t];
 * @property {Material} [material]
 * @property {Boolean} [frontFace];
 */

module.exports = class Hittable {
    /**
     * Check if ray hits Hittable
     * @param ray - the ray to check
     * @param t_min
     * @param t_max
     * @returns {HitResult}
     */
    hit(ray, t_min, t_max) {
        return {
            hit: false,
        };
    }

    /**
     * Sets the frontFace and normal property in a HitResult
     * changes passed HitResult
     * @param ray {Ray}
     * @param outwardNormal {Vector3}
     * @param hitResult {HitResult}
     */
    setFaceNormal(ray, outwardNormal, hitResult) {
        hitResult.frontFace = ray.direction.dot(outwardNormal) < 0;
        hitResult.normal = hitResult.frontFace ? outwardNormal : outwardNormal.mulN(-1);
        return hitResult;
    }
};
