import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please input request title!']
    },
    createdId: {
        type: String,
        required: [true, 'Please input id of creator!']
    },
    createdName: {
        type: String,
        required: [true, 'Please input name of creator!']
    },
    receivedBy: { type: String, default: "admin" },
    content: {
        type: String,
        required: [true, 'Please input report content!']
     },
    picture: String,
    createAt: { type: Date, default: Date.now},
    status: { type: String, enum:["approved","unapproved"], default: "unapproved" }
});

var request = mongoose.model('request', requestSchema);

export default request;
