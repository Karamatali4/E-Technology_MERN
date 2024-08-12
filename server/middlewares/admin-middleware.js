

const adminmiddleware = async(req,res,next) => {

    try {

        const adminRoll = req.user.isAdmin;

        if(!adminRoll)
        {
            return res.status(403).json({message:"Access denied. User is not admin."})
        }
        // if user is an admin , proceed to next middleware
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}


module.exports = adminmiddleware;