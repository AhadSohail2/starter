const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-paper-1296589_960_720.png"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    vendor:{
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    }
})

module.exports = mongoose.model('Event', EventSchema);