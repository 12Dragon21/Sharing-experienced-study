const FAQs = require('../models/FAQs');

async function CreateFAQ (question, answer)
{
    await FAQs.create({question: "absdjkkabj?", answer: "asdasdasds"});
}

module.exports = CreateFAQ;