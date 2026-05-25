const Document = require('../models/document.model');

/* GET ALL DOCUMENTS */
const getDocuments = async (req, res) => {

  try {

    const docs = await Document.findAll();

    res.json(docs);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/* GET SINGLE DOCUMENT */
const getDocument = async (req, res) => {

  try {

    const doc = await Document.findByPk(
      req.params.id
    );

    if (!doc) {

      return res.status(404).json({
        message: 'Document not found'
      });

    }

    res.json(doc);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

/* CREATE DOCUMENT */
const createDocument = async (req, res) => {

  try {

    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    /* CHECK FILE */
    if (!req.file) {

      return res.status(400).json({
        message: 'No file uploaded'
      });

    }

    /* VALIDATE REQUIRED FIELDS */
    if (
      !req.body.title ||
      !req.body.patientId ||
      !req.body.uploadedBy
    ) {

      return res.status(400).json({
        message: 'Missing required fields'
      });

    }

    /* CREATE DOCUMENT */
    const doc = await Document.create({

      title: req.body.title,

      fileType: req.file.mimetype,

      patientId: req.body.patientId,

      uploadedBy: req.body.uploadedBy,

      fileUrl:
        `http://localhost:3000/uploads/${req.file.filename}`

    });

    res.status(201).json(doc);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: err.message
    });

  }
};

/* DELETE DOCUMENT */
const deleteDocument = async (req, res) => {

  try {

    await Document.destroy({
      where: {
        id: req.params.id
      }
    });

    res.json({
      message: 'Deleted successfully'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  deleteDocument
};