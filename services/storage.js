import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
});
async function uploadFileToImage(fileBuffer, fileN) {
  const uploadres = await imagekit.files.upload({
    file: fileBuffer.toString("base64"),
    fileName: fileN,
  });
  return uploadres;
}

export { uploadFileToImage };
