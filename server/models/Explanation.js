const { Schema, model } = require('mongoose');

const explanationSchema = new Schema({
    question: {
        type:String,       
    },
    response: {
        type: String,  
    },
});

const Explanation = model('Explanation', explanationSchema);

module.exports = Explanation;