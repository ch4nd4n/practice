const sharp = require('sharp');

function main() {
    const infile = './data/1.avif';
    const outfile = './data/output.jpg'
    // sharp(input).toFile('./data/output.jpg').then(info => console.log({ info })).catch((err) => console.log({ err }))
    sharp(infile).resize({ width: 128 }).jpeg({ quality: 25 }).toBuffer().then((info) => {
        console.log(info.toString('base64'));
    });
}

main();