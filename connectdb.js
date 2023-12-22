const mongoose = require('mongoose');
async function connectDb() 
{ 
    await mongoose.connect(process.env.MONGOOSEDBCONNECTION);
}

module.exports = connectDb;