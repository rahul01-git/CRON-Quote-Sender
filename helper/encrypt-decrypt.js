const crypto = require("crypto");
function encryptData(data, key) {
  const cipher = crypto.Cipher(process.env.ENC_TYPE, key);
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

function decryptData(encryptedData, key) {
  const decipher = crypto.Decipher(process.env.ENC_TYPE, key);
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
}

module.exports = {
  encryptData,
  decryptData,
};
