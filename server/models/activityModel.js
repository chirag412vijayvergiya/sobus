const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    activityName: {
      type: String,
      required: [true, 'activity name is required'],
    },
    activityDescription: {
      type: String,
      required: [true, 'activity description is required'],
    },
    activityLocation: {
      type: String,
      required: [true, 'activity location is required'],
    },
    activityStartDate: {
      type: Date,
      required: [true, 'activity date is required'],
    },
    activityEndDate: {
      type: Date,
      required: [true, 'activity date is required'],
      validate: {
        validator: function (value) {
          return value >= this.activityStartDate;
        },
        message:
          'activityend date and time must be greater than activityStart date',
      },
    },
    activityItenry: {
      type: String,
      // required: [true, 'activity Itenry is required'],
    },
    // activityTime: {
    //   type: String,
    //   required: [true, 'activity time is required'],
    // },
    speakers: {
      type: [String],
      validate: {
        validator: function (value) {
          // Custom validator function to check if the array is not empty
          return value && value.length > 0;
        },
        message: 'At least one speaker is required.',
      },
    },
    GoogleFormLink: {
      type: String,
      required: [true, 'Google Form Link is required'],
    },
    excelLink: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true }, // By this we ensure that virtual properties are included when i
    toObject: { virtuals: true }, //convert a Mongoose document to either JSON or JavaScript object.
    id: false,
  },
);

activitySchema.virtual('activity', {
  ref: 'Activities',
  foreignField: 'activity',
  localField: '_id',
});

// ******************************************************************************* //

const Activities = mongoose.model('Activities', activitySchema);
module.exports = Activities;
