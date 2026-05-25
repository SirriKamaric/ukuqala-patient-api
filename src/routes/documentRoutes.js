const express = require('express');

const multer = require('multer');

const path = require('path');

const router = express.Router();

/* CONTROLLER */
const {
  getDocuments,
  getDocument,
  createDocument,
  deleteDocument
} = require('../controllers/document.controller');

/* MULTER CONFIG */
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, 'uploads/');

  },

  filename: function (req, file, cb) {

    cb(
      null,
      Date.now() +
      path.extname(file.originalname)
    );

  }

});

const upload = multer({
  storage: storage
});

/* ROUTES */

router.get('/', getDocuments);

router.get('/:id', getDocument);

router.post(
  '/',
  upload.single('document'),
  createDocument
);

router.delete('/:id', deleteDocument);

module.exports = router;