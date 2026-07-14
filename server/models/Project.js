const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    techStack: [
      {
        type: String,
        required: true
      }
    ],
    image: {
      type: String,
      default: '/assets/project-placeholder.jpg'
    },
    liveLink: {
      type: String,
      default: ''
    },
    githubLink: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
