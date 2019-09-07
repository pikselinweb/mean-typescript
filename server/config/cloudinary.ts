import * as cloudinary from 'cloudinary';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
dotenv.config();
const cryptoAlgorithm = 'aes-256-ctr';
const cryptoPassword = 'PW_FOR_ENCRYPT_FILENAME';

const cloudinarySchema = Joi.object({
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.number().required(),
  CLOUDINARY_API_SECRET: Joi.string().required()
})
  .unknown()
  .required();
const { error, value: cloudinaryVars } = Joi.validate(
  process.env,
  cloudinarySchema
);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

cloudinary.config({
  cloud_name: cloudinaryVars.CLOUDINARY_NAME,
  api_key: cloudinaryVars.CLOUDINARY_API_KEY,
  api_secret: cloudinaryVars.CLOUDINARY_API_SECRET
});

const encrypt = text => {
  const cipher = crypto.createCipher(cryptoAlgorithm, cryptoPassword);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const uploadPP = async (file, imgId) => {
  const fileName = encrypt(imgId.toString());
  const img = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'auto',
    public_id: 'profilePictures/' + fileName,
    overwrite: true
  });
  return img;
};
