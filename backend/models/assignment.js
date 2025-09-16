const { Schema, model } = require('mongoose')

const assignmentSchema = new Schema({
  assignmentTitle: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  problems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Problem',
      required: true,
    }
  ],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedAt: {
    type: Date,
    default: Date.now,
  },
  studentsCompleted: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
      },
      correctProblems: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Problem',
        }
      ],
    },
  ]
})

assignmentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Assignment', assignmentSchema)