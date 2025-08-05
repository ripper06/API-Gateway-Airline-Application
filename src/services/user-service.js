const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {UserRepository} = require('../repositories');
const userRepo = new UserRepository();


async function create(data){
    try {
        const user = await userRepo.create(data);
        return user;
    } catch (error) {

        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.value + " : " + err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Canot create a new user object', StatusCodes.BAD_REQUEST)
    }
}
module.exports = {
    create,
}