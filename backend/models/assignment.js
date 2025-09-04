const { Schema, model } = require('mongoose')

const assignmentSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  problems: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  }
})

assignmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Assignment', assignmentSchema)