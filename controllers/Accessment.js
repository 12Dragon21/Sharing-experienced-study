const Accessment = require('../models/Accessment');

async function getAllAccessMent() {
  try {
    const accessment = await Accessment.find();
    return accessment;
  } catch (error) {
    console.error('Error fetching Accessment:', error);
    throw error;
  }
}

async function createAccessment(state, accountID, documentID) {
  try {
    const newAccessment = new Accessment({State: state, AccountID: accountID, DocumentID: documentID})
    await newAccessment.save();
    return newAccessment;
  } catch (error) {
    console.error('Error creating Accessment:', error);
    throw error;
  }
}

module.exports = {
  getAllAccessMent,
  createAccessment,
};
