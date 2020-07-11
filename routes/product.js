const router = require('express').Router()
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream')
const conn = require('../db/index')

const { Product } = require('../models/product')

// FILES STORAGE CONFIGURATION

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
});

// Storage
const storage = new GridFsStorage({
  url: process.env.DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage,
  fileFilter
});

//  PRODUCT ROUTES
router.get('/get', async (req, res) => {
  let product = await Product.find()

  res.send(product)
})

router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({
    filename: req.params.filename
  }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no files exist"
      })
    }

    if (file.contentType === "image/png" || file.contentType === "image/jpeg") {
      const readStream = gfs.createReadStream(file.filename)
      readStream.pipe(res)
    } else {
      res.status(404).send('no file was found...')
    }
  })
})

router.post('/add', upload.single('file'), async (req, res) => {
  let newProduct = JSON.parse(req.body.product)
  newProduct.avatar = req.file.filename
  let product = new Product(newProduct)
  product = await product.save()

  // res.redirect("/");
  res.send(200)
})


router.post('/upload', upload.single('file'), async (req, res) => {
  console.log(req.file)
  console.log(req.body)
  res.send(req.file)
})

module.exports = router
