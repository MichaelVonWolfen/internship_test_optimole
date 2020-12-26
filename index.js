//here you can require you dependencies or external functions
exports.handler = async function (event) {
  //here you will add your code
  //the variable that will store all the data by the returned object
  // const event = { optimoleKey: "bHVja3k=" };
  const path = require("path");
  const fs = require("fs");
  const sharp = require("sharp");

  const images_folder = "images";
  const dest_folder = "optimized";

  if (!fs.existsSync(dest_folder)) {
    fs.mkdir(dest_folder, (err) => console.log(err));
  }
  var images = fs.readdirSync("./images");
  var pass = new Buffer.from(event.optimoleKey, "base64").toString();
  var dest_img = images.map((image) => {
    return image.split(".")[0] + ".webp";
  });

  var Pimage_dims = [];
  var image_dims = [];
  images.map((image) => {
    Pimage_dims.push(
      sharp(path.join(__dirname, images_folder, image))
        .png()
        .metadata()
        .then((metadata) => {
          image_dims.push({ width: metadata.width, height: metadata.height });
        })
    );
  });
  await Promise.all(Pimage_dims);

  let images_new_dims = image_dims.map((dim) => {
    if (dim.width > dim.height) return { width: 500, height: dim.height };
    else return { width: dim.width, height: 500 };
  });

  let sharPimage = [];
  for (index in images) {
    image_dims[index].width > image_dims[index].height
      ? sharPimage.push(
          sharp(path.join(__dirname, images_folder, images[index]))
            .webp()
            .resize({ width: 500 })
            .toFile(path.join(__dirname, dest_folder, dest_img[index]))
        )
      : sharPimage.push(
          sharp(path.join(__dirname, images_folder, images[index]))
            .webp()
            .resize({ height: 500 })
            .toFile(path.join(__dirname, dest_folder, dest_img[index]))
        );
  }
  await Promise.all(sharPimage);
  let optimized = [];

  for (index in dest_img) {
    let original_res = image_dims[index].height * image_dims[index].width;
    let optimized_res =
      images_new_dims[index].height * images_new_dims[index].width;
    optimized.push({
      filePath: dest_folder + "/" + dest_img[index],
      procent: Math.floor(100 * (optimized_res / original_res)),
    });
  }
  return { pass: pass, optimized: optimized };
};
