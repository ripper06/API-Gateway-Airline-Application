const dotenv = require('dotenv');//calls an object

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    SALT_ROUNDS : process.env.SALT_ROUNDS
}
