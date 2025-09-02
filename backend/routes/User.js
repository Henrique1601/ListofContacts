const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: false},
  email: { type: String, required: false , unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  appleId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  twitterId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  linkedinId: { type: String, unique: true, sparse: true },
})

module.exports = mongoose.model('User_contacts', UserSchema)
