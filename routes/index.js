var express = require('express');
var router = express.Router();
var webp = require('webp-converter');
var uniqid = require('uniqid');

//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WebP', descr: 'Convert your image from/to webP' });
});

router.post('/convert', upload.single('imageupload'), function(req, res, next) {
  console.log('res->', res);
  const outputName = uniqid() + req.file.originalname;
  webp.cwebp(req.file.path, outputName, "-q 80", function(status) {

  	//if exicuted successfully status will be '100'
  	//if exicuted unsuccessfully status will be '101'
    console.log('STATUS--------->',status);
    res.json({
      from: req.file.mimetype,
      to: 'image/webp',
      downloadLink: '/download/' + outputName
    });
  });  
  // res.json();
});

router.get('/download/:imageID', function(req, res, next) {
  const imageID = req.params.imageID
  console.log('imageID ->', imageID)
  // res.render('index', { title: 'WebP', descr: 'Convert your image from/to webP' });
});

module.exports = router;
