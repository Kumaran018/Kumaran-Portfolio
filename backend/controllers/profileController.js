const Profile = require('../models/Profile');

// @desc    Get profile information
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({});
    
    // Seed default resume data if no profile exists
    if (!profile) {
      profile = await Profile.create({
        name: 'Kumaran R P',
        role: 'Full Stack Developer | AI & Data Science Student',
        email: 'kumaranrp49@gmail.com',
        phone: '9655347360',
        location: 'Coimbatore, India',
        github: 'github.com',
        linkedin: 'linkedin.com/in/kumaran-rp-4755a232b',
        summary: 'Detail-oriented Full Stack Developer Intern with experience in Python, Django, and JavaScript. Developed a Gym Management System, implementing secure authentication and responsive design. Motivated and adaptable individual with a strong foundation in software development. Experienced in team collaboration within Agile environments, contributing to projects that enhance user experience and operational efficiency.',
        skills: {
          programming: ['Python', 'Java', 'C++'],
          webAndMern: ['HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Express', 'MongoDB'],
          dbAndTools: ['Git', 'GitHub', 'VS Code', 'Canva']
        },
        experience: [
          {
            title: 'Full Stack Developer Intern (Django)',
            company: 'Ether Services',
            location: 'Coimbatore, India',
            dateRange: '05/2026 – 06/2026',
            bullets: [
              'Developed a Gym Management System using Python, Django, SQLite, HTML, CSS, JavaScript, and Bootstrap.',
              'Built modules for member management, attendance, memberships, billing, trainer management, and reporting.',
              'Implemented secure authentication, CRUD operations, and responsive UI using Django and Bootstrap.',
              'Generated PDF invoices, Excel reports, and QR code-based check-in functionality.',
              'Used Git for version control and collaborated in an Agile development environment.'
            ]
          },
          {
            title: 'English Typewriting – Senior Grade',
            company: 'Shobana Typewriting Institute',
            location: 'Coimbatore, India',
            dateRange: 'Completed',
            bullets: [
              'Self-motivated, with a strong sense of personal responsibility; skilled at working independently and collaboratively.',
              'Worked effectively in fast-paced environments with proven ability to learn quickly and adapt.'
            ]
          }
        ],
        education: [
          {
            degree: 'Bachelor of Technology',
            fieldOfStudy: 'Artificial Intelligence and Data Science',
            institution: 'Kalaignar Karunanidhi Institute of Technology',
            location: 'Coimbatore, India',
            dateRange: 'Expected 03/2028',
            cgpa: '8.04%'
          }
        ],
        languages: [
          { language: 'English', proficiency: 'Advanced (C1)' },
          { language: 'Tamil', proficiency: 'Bilingual / Proficient (C2)' }
        ]
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile info
// @route   PUT /api/profile
// @access  Private/Admin
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({});
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      // Merge updates
      Object.assign(profile, req.body);
    }
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
