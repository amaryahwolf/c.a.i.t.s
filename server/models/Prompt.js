const { Schema, model } = require('mongoose');

// 
const promptSchema = new Schema({
    difficulty: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    prompt: {
        type:String,       
    },
    question: {
        type:String,       
    },
    response: {
        type: String,  
    },
    feedback: {
        type: String,
    },
});

const Prompt = model('Prompt', promptSchema);

module.exports = Prompt;