const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100 MB limit for video files
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).fields([
  { name: 'image', maxCount: 1 }, 
  { name: 'file', maxCount: 1 },  // Support image and document upload in the file field
  { name: 'video', maxCount: 5 },
  { name: 'gallery_images', maxCount: 200 }
]); // Support both image and video upload

// Check file type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|pdf|doc|docx|mp4|mov|wmv|avi/; // Added video file types
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Images, Videos, PDFs, and Word Documents Only!');
  }
}

module.exports = upload;

