const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Submit a new message
// @route   POST /api/messages
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      // Use Resend HTTP API (works perfectly on Render)
      const emailBody = {
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.EMAIL_RECEIVER || 'kumaranrp49@gmail.com',
        subject: `Portfolio Contact: ${subject || 'No Subject'}`,
        html: `<h3>New Portfolio Message</h3>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br>')}</p>`
      };

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailBody)
      })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          console.log('Notification email sent successfully via Resend:', data);
        } else {
          console.error('Resend API error:', data);
        }
      })
      .catch((err) => console.error('Resend network error:', err.message));

    } else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Fallback to Nodemailer SMTP (works locally)
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_RECEIVER || 'kumaranrp49@gmail.com',
        subject: `Portfolio Contact: ${subject || 'No Subject'}`,
        text: `You have received a new message from your portfolio website.
          
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,
      };

      transporter.sendMail(mailOptions)
        .then(() => console.log('Notification email sent successfully via SMTP'))
        .catch((emailErr) => {
          console.error('Nodemailer SMTP error:', emailErr.message);
        });
    }

    res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data: newMessage
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      message.isRead = true;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (message) {
      await message.deleteOne();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage
};
