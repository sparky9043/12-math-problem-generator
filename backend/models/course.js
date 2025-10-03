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
    unique: true,
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
    returnedObject.id = returnedObject._id?.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.user && returnedObject.user._id) {
      returnedObject.user = returnedObject.user._id.toString()
    }

    if (Array.isArray(returnedObject.students)) {
      returnedObject.students = returnedObject.students.map(s =>
        s._id ? s._id.toString() : s.toString()
      )
    }
  }
})


module.exports = mongoose.model('Course', courseSchema)