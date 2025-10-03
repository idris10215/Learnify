import express from "express";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.post("/generate-url", async (req, res) => {
    console.log("Backend received request body:", req.body);
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      console.error("Validation Error: fileName and fileType are required.");
      return res
        .status(400)
        .json({ message: "File name and type are required." });
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}_${fileName}`,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    console.log("Backend generated this Signed URL:", signedUrl);


    console.log(`Successfully generated signed URL for ${fileName}`);

    res.status(200).json({ uploadUrl: signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating upload URL" });
  }
});

export default router;
