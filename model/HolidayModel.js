const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const holidaySchema = new Schema({
    date:{type:Date,required:true}
});

const Holiday = mongoose.model('Holiday', holidaySchema);

module.exports = Holiday;