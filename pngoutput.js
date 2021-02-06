const fs = require('fs');
const Color = require('./color.js');
const Jimp = require('jimp');

module.exports = class PNGOutput {
    #width = 512;
    #height = 512;
    #channels = 3;
    //#pixels = [];
    #image;
    constructor(width, height, channels) {
        this.#height = height;
        this.#width = width;
        this.#channels = channels || this.#channels;
    }

    init() {
        return new Promise((res, rej) => {
            new Jimp(this.#width, this.#height, (err, image) => {
                this.#image = image;
                res();
            });
        });
    }

    pushPixelRow(y, colors) {
        for(let i = 0; i < colors.length; i++) {
            //const map = colors[i].map(255, this.#channels);
            this.#image.setPixelColor(Jimp.rgbaToInt(colors[i].r * 255, colors[i].g * 255, colors[i].b * 255, colors[i].a * 255), i, y);
        }
    }

    setPixel(x, y, color) {
        const map = color.map(255, this.#channels);
        // for(let i = 0; i < map.length; ++i) {
        //     this.#pixels[x * y * this.#channels + i] = map[i];
        // }
        this.#image.setPixelColor(Jimp.rgbaToInt(...map), x, y);
    }

    /**
     * @param pixels - 1 dimensional array of pixels
     */
    // setPixels(pixels) {
    //     this.#pixels = pixels;
    // }

    save(filename) {
        this.#image.write(filename);
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }
};
