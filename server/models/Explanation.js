const { Schema, Types } = require('mongoose');

const explanationSchema = new Schema({
    explanationId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    question: {
        type: String,
    },
    response: {
        type: String,
    },
},
    {
        id: false
    }
);

module.exports = explanationSchema;