const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
  {
    name: { type: String, default: 'Kumaran R P' },
    role: { type: String, default: 'Full Stack Developer | AI & Data Science Student' },
    email: { type: String, default: 'kumaranrp49@gmail.com' },
    phone: { type: String, default: '9655347360' },
    location: { type: String, default: 'Coimbatore, India' },
    github: { type: String, default: 'github.com' },
    linkedin: { type: String, default: 'linkedin.com/in/kumaran-rp-4755a232b' },
    summary: {
      type: String,
      default: 'Detail-oriented Full Stack Developer Intern with experience in Python, Django, and JavaScript. Developed a Gym Management System, implementing secure authentication and responsive design. Motivated and adaptable individual with a strong foundation in software development.'
    },
    skills: {
      programming: { type: [String], default: ['Python', 'Java', 'C++'] },
      webAndMern: { type: [String], default: ['HTML', 'CSS', 'JavaScript', 'React', 'Node', 'Express', 'MongoDB'] },
      dbAndTools: { type: [String], default: ['Git', 'GitHub', 'VS Code', 'Canva'] }
    },
    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        dateRange: { type: String },
        bullets: { type: [String] }
      }
    ],
    education: [
      {
        degree: { type: String },
        fieldOfStudy: { type: String },
        institution: { type: String },
        location: { type: String },
        dateRange: { type: String },
        cgpa: { type: String }
      }
    ],
    languages: [
      {
        language: { type: String },
        proficiency: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
