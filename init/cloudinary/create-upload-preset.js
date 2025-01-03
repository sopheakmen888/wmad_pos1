/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();
const cloudinary = require("cloudinary");

cloudinary.v2.api
  .create_upload_preset({
    name: "demo_preset",
    tags: "pos, sale, customer",
    folder: "demo",
    allowed_formats: ["jpg", "png", "gif"],
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
