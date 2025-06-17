const express = require('express');
const router = express.Router();

const { upload } = require('../service/uploadService');
const { uploadImage } = require('../controllers/uploadController');

router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;
