const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ServerConfig } = require('../../config');
const { JWT_SECRET } = require('../../config/server-config');

function checkPassword(plianPassword,encryptedPassword){
    try {
        return bcrypt.compareSync(plianPassword,encryptedPassword);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function createToken(input){
    try {
        return jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn : ServerConfig.JWT_EXPIRY})
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function verifyToken(token){
    try{
        return jwt.verify(token,JWT_SECRET); 
    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
    verifyToken
}