const User = require("../models/user_model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");




// for users controller data fetching admin panel
const getAllUsers = async(req,res) => {

    try {
        
        // methods to hide password
        // const users = await User.find().select({password:0});
        const users = await User.find({},{password:0});


        console.log(users);
        if(!users || users.length===0)
        {
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// for contact controller data fetching admin panel

const getAllContact = async(req,res) => {

    try {
        const contact = await Contact.find();

        if(!contact || contact.length===0){
            return res.status(404).json({message:"Contact not found"});
        }

        return res.status(200).json(contact);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

//for service controller data fecting admin panel
// const getAllservice = async(req,res) => {

//     try {
        
//         const service = await Service.find();


//         if(!service || service.length===0){
//             return res.status(404).json({message:"service no found"});
//         }

//         return res.status(200).json(service);

//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }

// *____________________________________________________
    // single user  get
// *____________________________________________________
const usersgetById  = async(req,res) => {
    try {
        const id = req.params.id;

        const data =  await User.findOne({_id:id},{password:0});

        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

// *____________________________________________________
    // user update Logic
// *____________________________________________________
const updateUsersById = async(req,res) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updateData = await User.updateOne({_id:id},{
            $set:updateUserData,
        });
        return res.status(200).json(updateData);
    } catch (error) {
        next(error);
    }
}



// *____________________________________________________
    // user delete Logic
// *____________________________________________________
const deleteUsersById  = async(req,res) => {
    try {
        const id = req.params.id;

        await User.deleteOne({_id:id});

        return res.status(200).json({message:"User delete successfully"});
    } catch (error) {
        next(error);
    }
}




// *____________________________________________________
    // contact delete Logic
// *____________________________________________________
const deleteContactsById = async(req,res) => {
    try {
        const id = req.params.id;

        await Contact.deleteOne({_id:id});

        return res.status(200).json({message:"Delete contact successfully.."});
        
    } catch (error) {
        next(error);
    }
}
module.exports= {getAllUsers,getAllContact,deleteUsersById,updateUsersById,deleteContactsById, usersgetById};