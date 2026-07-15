const Certificate = require('../models/Certificate');

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({}).sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a certificate
// @route   POST /api/certificates
// @access  Private/Admin
const createCertificate = async (req, res) => {
  try {
    const { title, issuer, issueDate, link } = req.body;

    const certificate = new Certificate({
      title,
      issuer,
      issueDate,
      link
    });

    const createdCertificate = await certificate.save();
    res.status(201).json(createdCertificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a certificate
// @route   PUT /api/certificates/:id
// @access  Private/Admin
const updateCertificate = async (req, res) => {
  try {
    const { title, issuer, issueDate, link } = req.body;

    const certificate = await Certificate.findById(req.params.id);

    if (certificate) {
      certificate.title = title || certificate.title;
      certificate.issuer = issuer || certificate.issuer;
      certificate.issueDate = issueDate || certificate.issueDate;
      certificate.link = link || certificate.link;

      const updatedCertificate = await certificate.save();
      res.json(updatedCertificate);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a certificate
// @route   DELETE /api/certificates/:id
// @access  Private/Admin
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (certificate) {
      await certificate.deleteOne();
      res.json({ message: 'Certificate removed' });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate
};
