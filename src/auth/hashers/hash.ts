import crypto from "crypto";
import EnvData from "../../config/data/env-data";

export const random = () => {
  return crypto.randomBytes(128).toString("base64");
};

export const getHashedPassword = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(EnvData.SECRET_KEY)
    .digest("hex");
};

export const check_password = (password: string, hashed_password: string, salt: string) => {
  const expected_hashed_password = getHashedPassword(salt, password);
    if (expected_hashed_password === hashed_password) {
        return true;
    }
    return false;
}