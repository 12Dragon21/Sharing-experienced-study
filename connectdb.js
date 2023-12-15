const mongoose = require('mongoose');
async function connectDb() 
{ 
    await mongoose.connect('mongodb+srv://Admin:Admin123@ses.3jvksvz.mongodb.net/?retryWrites=true&w=majority');
}

module.exports = connectDb;