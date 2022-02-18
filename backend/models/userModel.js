const mongoose = require('mongoose');
//the user schema model
const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: [true, 'Please enter a name']
    },
    email: {
        type : String,
        required: [true, 'Please enter a email  '],
        unique :true
        
    },
    password: {
        type : String,
        required: [true, 'Please enter a Password']
    },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);