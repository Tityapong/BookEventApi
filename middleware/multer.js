// import multer from 'multer';

// const storage=multer.diskStorage({
//   __filename:function(req,file,cb){
//     cb(null,file.originalname)

//   }
// })
// const upload=multer({storage})
// export default upload

// const multer = require('multer');

// const storage = multer.memoryStorage(); // Use memory storage for Cloudinary uploads
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// };

// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // 2MB file size limit
//     fileFilter,
// });

// module.exports = upload;

import multer from 'multer';

const storage=multer.diskStorage({
  __filename:function(req,file,cb){
    cb(null,file.originalname)

  }
})
const upload=multer({storage})
export default upload