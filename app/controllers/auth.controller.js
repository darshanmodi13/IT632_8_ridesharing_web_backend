//responses
const responses = require("../utils/responses");

//model
const User = require("../models").User;

exports.register = async (req, res) => {
    try {
        let user = await User.findOne({
            $or: [
                {
                    mobile_no: req.body.mobile_no
                },
                {
                    email: req.body.email
                }
            ]
        })

        if (user) {
            return responses.badRequestResponse(
                res, {},
                "Email Or User Name Already Registered..."
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash_password;

        let new_user = await User.create(req.body);
        return responses.successfullyCreatedResponse(
            res,
            new_user,
            "User Created Successfully..."
        );
    } catch (error) {
        console.log(error);
        response.serverErrorResponse(res, "Server Error...");
    }
};

exports.signin = async (req, res) => {
    try{
        let { mobile_no , password } = req.body;

        if(!mobile_no || !password){
            return responses.badRequestResponse(res,"please, enter all fields.");
        }

        let user = await User.findOne({ mobile_no : mobile_no });

        if(!user){
            return responses.badRequestResponse(res,"Invalid Credentials.");
        }

        let isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch){
            return responses.badRequestResponse(res,"Invalid Credentials.");
        }

        let token = await jwt.sign({ id : user._id },process.env.SECRET,{
            expiresIn : "10d",
        });

        return responses.successResponse(res,{user,token},"User Log in Successful.");

    }
    catch(err){
        return responses.serverErrorResponse(res,"Server Error.");
    }
};