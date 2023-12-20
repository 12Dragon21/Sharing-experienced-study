const Account = require('../models/Account');

async function getAllAccount() {
  try {
    const account = await Account.find();
    return account;
  } catch (error) {
    console.error('Error fetching Account:', error);
    throw error;
  }
}

async function createAccount(username, password, email, role, phone, imageURL) {
  try {
    const newAccount = new Account({Username: username, Password: password, Email: email, Role: role, Phone: phone, ImageURL: imageURL})
    await newAccount.save();
    return newAccount;
  } catch (error) {
    console.error('Error creating Account:', error);
    throw error;
  }
}

module.exports = {
  getAllAccount,
  createAccount,
};
