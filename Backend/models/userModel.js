const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   image: {
    type: String,
    default: 'https://res.cloudinary.com/dzfen78it/image/upload/v1781978342/profile_pic_nx1jnp.png'
   },
   address: {
    type: Object,
    default: {line1: '', line2: ''},
   },
   gender: {
    type: String,
    default: ('Not Selected')
   },
   dob: {
    type: String,
    default: ('Not Selected')
   },
   phone: {
    type:String,
    default: '0000000000'
   }

}, {minimize:false})

module.exports = mongoose.models.user || mongoose.model('user', userSchema);