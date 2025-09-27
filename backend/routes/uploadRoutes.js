import express from 'express';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();


const s3Client = new S3Client({

    region : process.env.AWS_BUCKET_REGION,
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }

})


router.post('/generate-url', async (req, res) => {

    try {

        const {fileName, fileType} = req.body;

        const command = new PutObjectCommand({
            Bucket : process.env.AWS_BUCKET_NAME,
            Key : `uploads/${Date.now()}_${fileName}`,
            ContentType : fileType
        });

        const signedUrl = await getSignedUrl(s3Client, command, {expiresIn : 300});

        res.status(200).json({uploadUrl : signedUrl});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Error generating upload URL'});
    }

})

export default router;