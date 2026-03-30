import { Injectable, Logger } from "@nestjs/common"
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

@Injectable()
export class S3Service {
    private readonly logger = new Logger(S3Service.name)

    private readonly s3Client = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
        },
        endpoint: process.env.AWS_ENDPOINT,
        forcePathStyle: true,
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
    })
    private readonly bucketName = process.env.AWS_BUCKET_NAME

    async getSignedUrl(key: string, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType
        })
        return getSignedUrl(this.s3Client, command, { expiresIn: 3600, signableHeaders: new Set(["Content-Type"]) })
    }

    async deleteObject(key: string) {
        if (!key) return

        const command = new DeleteObjectCommand({
            Bucket: this.bucketName,
            Key: key
        })
        try {
            await this.s3Client.send(command)
            this.logger.log(`Deleted object: ${key}`)
        } catch (error) {
            this.logger.error(`Error deleting object: ${key}`, error)
        }
    }
}
