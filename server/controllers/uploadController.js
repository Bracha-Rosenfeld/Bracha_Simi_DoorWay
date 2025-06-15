const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'no file was uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ imageUrl });
};

module.exports = {
    uploadImage
};
