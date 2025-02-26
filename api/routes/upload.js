const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const base64Image = req.file.buffer.toString('base64');
    const imageSrc = `data:${req.file.mimetype};base64,${base64Image}`;

    res.json({ imageSrc });
});

module.exports = router;