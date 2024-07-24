const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: [true, 'activity name is required'],
    },
    projectDescription: {
      type: String,
      required: [true, 'activity description is required'],
    },
  },
  {
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
    id: false,
  },
);

// ******************************************************************************* //

const Projects = mongoose.model('Appointments', projectSchema);
module.exports = Projects;
