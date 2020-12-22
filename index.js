//here you can require you dependencies or external functions
// exports.handler = async function (event) {
//   //here you will add your code
// };
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
// let images_folder = path.join(__dirname, "images");
// fs.readdirSync(images_folder).forEach(async (image) => {
//   let image_path = path.join(images_folder, image);
//   let optimized = path.join(__dirname, "optimized", image);

//   let sharp_image = sharp(image_path);
//   let image_metadata = await sharp_image.metadata();
//   let width = image_metadata.width;
//   let height = image_metadata.height;
//   console.log(`Width: ${width} \t Height: ${height}`);

//   let min = Math.min(height, width);
//   let max = Math.max(height, width);

//   let choosen_size = min;
//   if (choosen_size === width) {
//     //choosen_size = width
//     sharp_image
//       .resize({
//         width: 500,
//       })
//       .toFile(optimized)
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     //choosen_size = height
//     sharp_image
//       .resize({
//         height: 500,
//       })
//       .toFile(optimized)
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });
fs.readdirSync("./optimized").forEach(async (image) => {
  let meta = await sharp(path.join(__dirname, "optimized", "image")).metadata();
  console.log(`${image} width: ${meta.width} \t height: ${meta.height}`);
});
