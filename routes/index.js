const express = require('express')
const router = express.Router()
const webp = require('webp-converter')
const uniqid = require('uniqid')
const fs = require('fs')
const outputDir = 'output/'
const webpExtension = '.webp'
//multer object creation
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
const upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
  res.render('index', { title: 'WebP', descr: 'Convert your image from/to webP' })
})

router.post('/convertFromImage', upload.single('imageupload'), function(req, res, next) {
  console.log('image type->', req.file.mimetype)
  const outputName = uniqid() + req.file.originalname + webpExtension  
  if(req.file.mimetype != 'image/gif') {
    webp.cwebp(req.file.path, outputDir + outputName, "-mt -q 80", function(status) {

      //if exicuted successfully status will be '100'
      //if exicuted unsuccessfully status will be '101'
      
      //solution for AJAX call
      // console.log('STATUS--------->',status);
      // res.json({
      //   from: req.file.mimetype,
      //   to: 'image/webp',
      //   downloadLink: '/download/' + outputName
      // });

      //solution for a barebone approach
      res.render('download', { title: 'Converting result', descr: 'Download your converted image', downloadLink: `/download/${outputName}`})
    })
  } else {
    webp.gwebp(req.file.path, outputDir + outputName, "-mt -q 80", function(status) {

      //if exicuted successfully status will be '100'
      //if exicuted unsuccessfully status will be '101'
      
      //solution for AJAX call
      // console.log('STATUS--------->',status);
      // res.json({
      //   from: req.file.mimetype,
      //   to: 'image/webp',
      //   downloadLink: '/download/' + outputName
      // });

      //solution for a barebone approach
      res.render('download', { title: 'Converting result', descr: 'Download your converted gif', downloadLink: `/download/${outputName}`})
    })
  }
})

router.post('/convertToImage', upload.single('imageupload'), function(req, res, next) {
  console.log('Request -> ', req)
  console.log('Type -> ', req.body.imageType)
  const newImageType = req.body.imageType
  const outputName = `${uniqid()}${req.file.originalname}.${newImageType}`
  webp.dwebp(req.file.path, outputDir + outputName, "-mt -o", function(status){
    res.render('download', { title: 'Converting result', descr: `Download your converted ${newImageType}`, downloadLink: `/download/${outputName}`})
  })
  
})

router.get('/download/:imageID', function(req, res, next) {
  const imageID = req.params.imageID
  console.log('imageID ->', imageID)
  // res.download(outputDir + imageID, imageID)
  var stream = fs.createReadStream(outputDir + imageID)
    stream.pipe(res).once("close", function () {
        stream.destroy()
        deleteFile(outputDir + imageID)
    })
})

module.exports = router
