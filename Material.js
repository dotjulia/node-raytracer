module.exports = class Material {
    /**
     * @typedef ScatterReturn
     * @property {boolean} doScatter
     * @property {Vector3} attenuation
     * @property {Ray} scattered
     */

    /**
     * @param {Ray} rayIn
     * @param {HitResult} hitRecord
     * @returns {ScatterReturn}
     */
    scatter(rayIn, hitRecord) {
        throw 'Not implemented';
    }
};
