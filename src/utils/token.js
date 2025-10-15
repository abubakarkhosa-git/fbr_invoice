import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { config } from "../config/index.js";
dotenv.config();
async function generateToken(payload, role) {
  const secretKey =
  config.secrets.jwtSecretKeyUser;

  const token = jwt.sign(payload, secretKey, {
    expiresIn: config.secrets.jwtTokenExp,
  });

  return token;
}

async function generateRefreshToken(payload, role) {
   const secretKey =
    config.secrets.jwtSecretKeyUser;
  

  const token = jwt.sign(payload, secretKey, {
    expiresIn: config.secrets.jwtRefreshExp,
  });

  return token;
}

export { generateToken, generateRefreshToken };
