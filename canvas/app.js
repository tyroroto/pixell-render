
const { createCanvas } = require('canvas');
const colors = require('./color.json');
const fs = require('fs');
/**
 * 
 * @param arrData uint Array represent color each pixell (44*44)
 * @returns {Promise<unknown>}
 */
createCanvasBuffer = async (arrData) => {
    // set scale up size from 44 px
    const multiplyScale = 10;
    const width = 44 * multiplyScale;
    const height = 44 * multiplyScale;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d')
    let index = 0;
    for (let i = 0; i < 44; i++) {
        for (let j = 0; j < 44; j++) {
            try {
                context.fillStyle = colors[arrData[index]].hexString;
            } catch (e) {
                // console.error(e)
                context.fillStyle = "#000000"
            }
            context.fillRect(j * multiplyScale, i * multiplyScale, multiplyScale, multiplyScale);
            index++;
        }
    }

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('canvas.png', buffer);
}
