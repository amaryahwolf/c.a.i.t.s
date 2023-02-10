const { Schema, model } = require('mongoose');


const promptSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
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