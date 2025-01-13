import * as cloudinary from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

cloudinary.v2.api
  .create_upload_preset({
    name: "demo_preset",
    tags: "pos, sale, customer",
    folder: "demo",
    allowed_formats: ["jpg", "png", "gif"],
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
