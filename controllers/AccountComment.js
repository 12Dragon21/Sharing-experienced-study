const AccountComment = require('../models/AccountComment');

async function getAllAccountComment() {
  try {
    const accountComment = await AccountComment.find();
    return accountComment;
  } catch (error) {
    console.error('Error fetching AccountComment:', error);
    throw error;
  }
}

async function createAccountComment(acLike, acDislike, acState, accountID, commentID,) 
{
  try {
    const newAccountComment = new AccountComment({ACLike: acLike, ACDislike: acDislike, ACState: acState, AccountID: accountID, CommentID: commentID})
    await newAccountComment.save();
    return newAccountComment;
  } catch (error) {
    console.error('Error creating AccountComment:', error);
    throw error;
  }
}

module.exports = {
  getAllAccountComment,
  createAccountComment,
};