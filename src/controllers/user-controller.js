const { StatusCodes } = require('http-status-codes');
const {UserService} = require('../services');
const {SuccessResponse,ErrorResponse} = require('../utils/common')



async function signup(req,res){
    try {
        const User = await UserService.create({
            email : req.body.email,
            password : req.body.password,
        });
        SuccessResponse.data = User;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log("Error in controller", error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode  || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}

async function signin(req,res){
    try {
        const User = await UserService.signin({
            email : req.body.email,
            password : req.body.password,
        });
        SuccessResponse.data = User;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log("Error in controller", error)
        ErrorResponse.error = error;
        return res
                .status(error.statusCode  || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse)
    }
}


module.exports = {
    signup,
    signin,
}
