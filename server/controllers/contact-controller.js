
const Contact = require("../models/contact-model");
const contactForm = async(req,res) => {

    try {
        // res.status(200).send("Hi Contact Page");

        const response = req.body;

        const data =await Contact.create(response);
        //  res.status(201).json({message:"message  send successfully..."});
         res.status(201).json({message:data});


    } catch (error) {
        return res.status(201).json({message:"message  not send ..."});

    }
} 

module.exports = contactForm;