const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem',
    },
  ],
  courseCode: {
    type: String,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.codeHash
  }
})

module.exports = mongoose.model('Course', courseSchema)