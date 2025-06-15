// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();

const upload = require('../service/uploadService');
const { uploadImage } = require('../controllers/uploadController');

// route: POST /api/upload
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;
