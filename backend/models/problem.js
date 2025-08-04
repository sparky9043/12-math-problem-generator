const mongoose = require('mongoose')
const problemSchema = new mongoose.Schema({
  subject: String,
  branch: String,
  topic: String,
  question: String,
  choices: [
    {
      type: String,
    }
  ],
  answer: String,
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