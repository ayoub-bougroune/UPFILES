import express from 'express';
import multer from 'multer';
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from '../models/file';
import https from 'https';



const router = express.Router();
const storage = multer.diskStorage({});

let uploadedFile: UploadApiResponse ;

let upload = multer({
    storage
})
 
router.post("/upload",upload.single("myFille"), async (req, res) => {
   try {
        if (!req.file)
        return res.status(400).json({ message: "send file" });
        console.log(req.file);
      
        try {
              uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                 folder: "shareFile", 
                 resource_type:"auto"
             })
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Cloudinary Error" });
        }
        const { originalname } = req.file;
        const { secure_url, bytes, format} = uploadedFile;
        
         const file = new File({
             filename: originalname,
             sizeInBytes: bytes,
             secure_url,
             format,
         }); 
        res.status(200).json({
            id: file._id,
            downloadPageLink:`${process.env.API_BASE_ENDPOINT_CLIENT}download/${file._id}`,
        });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "server error :( we Can't send the re" });
   }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        if(!file) {
          return res.status(404).json({ message: "Not exist!" });
        }
        const { filename, format, sizeInBytes} = file;
        return res.status(200).json({
            name: filename,
            sizeInBytes,
            format,
            id,
        });
    }catch (error) {
       return res.status(500).json({ message: "Server Error :( we Can't get the file" });
    }
})

router.get("/:id/download", async (req, res) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);
        if(!file) {
          return res.status(404).json({ message: "Not exist!" });
        }
        https.get(file.secure_url, (fileStream) => fileStream.pipe(res));
    }catch (error) {
       return res.status(500).json({ message: "Server Error :( we Can't get the file" });
    }
})
export default router;
