import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024, //5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      //1.upload the image to cloudnary

      const uplaodPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataUrl = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataUrl);
        return res.url;
      });

      const imageUrls = await Promise.all(uplaodPromises);
      // if upload was sucessfull add the nurl to the new Hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUploaded = new Date();
      newHotel.userId = req.userId;

      //save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      res.status(200).send(hotel);
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).json({
        message: "Somthing went wrong",
      });
    }
  }
);

export default router;
