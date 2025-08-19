const mongoose = require('mongoose')
const problemSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
    unique: true,
  },
  choices: [
    {
      type: String,
    }
  ],
  answer: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

problemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Problem', problemSchema)