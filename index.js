//here you can require you dependencies or external functions
// exports.handler = async function (event) {
//   //here you will add your code
// };
// const Jimp = require("jimp");
const fs = require("fs");
const { networkInterfaces } = require("os");
const sharp = require("sharp");

var images_folder = __dirname + "/images";
//for each image in the images folder
fs.readdir(images_folder, (err, images) => {
  if (err) {
    console.log(err);
    return 0;
  }
  //for each image in images
  //read the image and convert it to webp
  //find the maximum between the witdh and height and upscale or downscale that value
  //while keeping the ratio safe
  //Can safelly read png and jpeg at the moment
  image_names = images.map(async (image_name) => {
    let image_data;
    let sharp_img = await sharp(images_folder + "/" + image_name).png();
    await sharp_img
      .metadata()
      .then((meta) => {
        let max = Math.max(meta.width, meta.height);
        let data = {
          name: image_name.split(".")[0],
          size_to_change: max === meta.width ? "width" : "height",
        };
        image_data = data;
      })
      .catch((err) => {
        throw err;
      });
    image_data.size_to_change === "width"
      ? sharp_img.resize({ width: 500 })
      : sharp_img.resize({ heigth: 500 });

    sharp_img.toFile("./optimized/" + image_data.name + ".png");
  });
});
// let w = meta.width;
// let h = meta.height;
// Jimp.read(img_path).then((img) => {
//   /*
//   / Find the maximum size between the width and height
//   */
//   let h = img.bitmap.height;
//   let w = img.bitmap.width;
//   let min = Math.maxnp(h, w);
//   console.log(`${image} \t ${h} \t ${w}`);
//   /*
//   upscale or downdcale the width or height at 500 px
//  */
//   if (min === h) {
//     img.resize(Jimp.AUTO, 500);
//   } else {
//     img.resize(500, Jimp.AUTO);
//   }
//   img.quality(40).write("./optimized/" + image);
// });
