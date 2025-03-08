import "server-only";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//   import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

/**
 * Upload an image to Cloudinary
 * @param {string} image - Base64 string or file path of the image
 * @param {string} folder - Cloudinary folder name (optional)
 * @returns {Promise<object>} - The response from Cloudinary
 */

export const uploadImage = async (image: string, folder = "food-app") => {
  try {
    const response = await cloudinary.uploader.upload(image, { folder });
    return response; // Contains details like secure_url
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default cloudinary;
