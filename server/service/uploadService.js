const multer = require('multer');
const fs = require('fs');
const util = require('util');

const unlinkAsync = util.promisify(fs.unlink);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

async function deleteFile(filePath) {
  try {
    await unlinkAsync(filePath);
    console.log(`✔️ File deleted: ${filePath}`);
  } catch (err) {
    console.error(`❌ Failed to delete file: ${filePath}`, err);
  }
}

module.exports = {
  upload,
  deleteFile
};
