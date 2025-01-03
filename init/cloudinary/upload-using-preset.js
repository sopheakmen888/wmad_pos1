/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const cloudinary = require("cloudinary");
const path = require("path");

const filePath = path.resolve(__dirname, "assets", "image1.jpg");
console.log(filePath);

cloudinary.v2.uploader
  .upload(filePath, {
    public_id: "123456",
    upload_preset: "demo_preset",
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
