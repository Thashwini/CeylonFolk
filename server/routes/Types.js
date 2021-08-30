const express = require("express");
const router = express.Router();
const { Types,sequelize } = require('../models/');

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tshirt_types')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const isImage = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('only jpeg and png Images is allowed..'));
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: isImage,
});

router.post("/", upload.single('photo'), async(req, res) => {


 
    const { types,price} = req.body;

    
    const imagePath = 'public/tshirt_types/' + req.file.filename;

    Types.create({
        types:types,
        coverImage: imagePath,
        price:price,
    })
    res.status(200).json({
        success: "Success"
    })
});

router.get("/", async (req, res) => {
    const listOfTypes = await Types.findAll();
    res.json(listOfTypes);
});



module.exports = router;