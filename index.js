//here you can require you dependencies or external functions
// exports.handler = async function (event) {
//   //here you will add your code
// };
const Jimp = require("jimp");
const fs = require("fs");

var images_folder = __dirname + "/images";
//for each image in the images folder
fs.readdir(images_folder, (err, images) => {
  images.forEach((image) => {
    let img_path = images_folder + "/" + image;
    //read the image
    Jimp.read(img_path).then((img) => {
      /*
      / Find the minimum size between the width and height
      */
      let h = img.bitmap.height;
      let w = img.bitmap.width;
      let min = Math.min(h, w);
      console.log(`${image} \t ${h} \t ${w}`);
      /*
      upscale or downdcale the width or height at 500 px
      */
      if (min === h) {
        img.resize(Jimp.AUTO, 500);
      } else {
        img.resize(500, Jimp.AUTO);
      }
      img.quality(40).write("./optimized/" + image);
    });
  });
});
// (async function () {
//   image.resize(500, Jimp.AUTO);
//   image.write("./optimized/image1.jpg");
// })();
