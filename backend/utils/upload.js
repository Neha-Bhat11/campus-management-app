const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
 if (!allowed.includes(ext)) {
    cb(new Error('Only PDF, DOC, DOCX allowed'));
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
