const mongoose = require('mongoose');
let Schema = mongoose.Schema;


// Models --------------------------------------------------------------------------------------------------------------

const user = new Schema({
    username: {type: String, maxlength: 32, required: true, unique:true},
    firstName: {type: String, maxlength: 32, required: true},
    lastName: {type: String, maxlength: 32, required: true},
    email: {type: String, maxlength: 128, required: true, unique:true},

},
    {
        timestamps: true
    });


mongoose.model('User', user);
