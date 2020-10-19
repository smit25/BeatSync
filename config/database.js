const mongoose = require('mongoose')
const mongourl = 'mongodb+srv://Smit:Hello@123@cluster0.ggolb.mongodb.net/<Users>?retryWrites=true&w=majority'

var mongoServer = async () => {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to Database')
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = mongoServer
