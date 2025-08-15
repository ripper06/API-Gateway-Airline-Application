const CrudRepository = require('./crud-repository');
const { Role } = require('../models');

class RoleRepository extends CrudRepository{
    constructor(){
        super(Role);
    }

 async getRoleByName(name) {
        const role = await Role.findOne({
            where: {
                name: name
            }
        });
        return role; // ✅ Return the user
    }
}

module.exports = RoleRepository;