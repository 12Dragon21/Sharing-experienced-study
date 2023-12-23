const AccountSchema = require('../models/Account');
const mongoose = require('mongoose')

async function getAllAccount(req, res) {
  try {
    const Accounts = await AccountSchema.find();
    return Accounts;
  } catch (error) {
    console.error('Error fetching Accounts:', error);
  }
}

async function createAccount(req, res) {
  try {
    const newAccount = new AccountSchema({
      Username: req.body.username,
      Password: req.body.new_password,
      Email: req.body.email,
      Role: req.body.role,
      Phone: req.body.phone,
      ImageURL: req.file?.path,
      Years: req.body.academic_year,
    });
    const savedAccount = await newAccount.save();
    return newAccount;
  } catch (error) {
    console.error('Error creating Account:', error);
    throw error;
  }
}

async function getAccount (req, res) {
  try {
    const id = req.cookies.account;
    const Account = await AccountSchema.findById(id);
    return Account;
  } catch (err) {
    res.status(500).json(err);
  }
}

async function checkLogin (req, res) {
  try {
    const Username = req.body.username;
    const Account = await AccountSchema.findOne({Username});
    if (Account == null)
    {
      res.status(400).json("Không tồn tại user");
    }
    else{
      const Password = req.body.password;
      if (Account.Password != Password)
      {
        res.status(400).json("Sai password");
      }
    }
    res.cookie("account", Account._id, {maxAge: 3600*1000*24});
    res.status(200).redirect('/userhome');
  } catch (error) {
    console.error('Error fetching Accounts:', error);
  }
}
async function updateAccount (req, res) {
  try {
    const Account = await AccountSchema.findById(req.params.id);
    await Account.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function deleteAccount (req, res) {
  try {
    await AccountSchema.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllAccount,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  checkLogin,
};
