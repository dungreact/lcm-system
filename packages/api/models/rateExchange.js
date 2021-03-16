import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
    rateExchange: {type: Number, default:"1"},
    created_date: { type: Date, default: Date.now()},
    last_modified_date : {type: Date}
});

var rateExchange = mongoose.model('rateExchange', rateSchema);

export default rateExchange;