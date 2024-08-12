const {Schema,model } = require("mongoose");


// form schema
const contactSchema = new Schema({
username:{
    type:String,
    required: true
},
email:{
    type:String,
    required: true
},
message:{
    type:String,
    required: true
},

});

// form model collection

const Contact = model("Contact",contactSchema);

module.exports = Contact;