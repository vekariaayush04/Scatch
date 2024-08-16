const  { v2  } = require('cloudinary') ;
const fs = require('fs')
require('dotenv').config()
async function uploadImage (file) {
    const byteArrayBuffer = Buffer.from(file.buffer)
    cloudinary = v2
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
        }).end(byteArrayBuffer);
    });
    

    
    return uploadResult
};

module.exports = uploadImage