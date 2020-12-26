//here you can require you dependencies or external functions
// exports.handler = async function (event) {
//   //here you will add your code
// };

//the variable that will store all the data by the returned object
var resulting_data = {};

const fs = require("fs");
const sharp = require("sharp");
var images_folder = __dirname + "/images";
//for each image in the images folder
const save_folder = "./optimized";

if (!fs.existsSync(save_folder)) {
  fs.mkdir(save_folder, (err) => console.log(err));
}
//Decodind the secret
let base_64_str = "dGVzdA==";
let buff = new Buffer.from(base_64_str, "base64");
let text = buff.toString("utf-8");
resulting_data.pass = text;
resulting_data.optimized = [];

fs.readdir(images_folder, (err, images) => {
  if (err) {
    console.log(err);
    return 0;
  }
  //read the image and convert it to webp
  //find the maximum between the witdh and height and upscale or downscale that value
  //while keeping the ratio safe
  //Can safelly read svg, gif png and jpeg at the moment and convert them to webp
  image_names = images.map(async (image_name) => {
    let image_data;
    let sharp_img = await sharp(images_folder + "/" + image_name).webp();
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

    sharp_img.toFile(save_folder + "/" + image_data.name + ".webp");
    resulting_data.optimized.push({
      filepath: `optimized/${image_data.name}.webp`,
      procent: 0,
    });
    console.log(resulting_data);
  });
});
