const { User } = require("../models");
const CrudRepository = require("./crud-repository");


class  UserRepository extends CrudRepository{
    constructor()
    {
        super(User);
    }
    async getUserByEmail(email)
    {
        const user = await User.find({
            email:email,
        });
        return user;
    }
    async findBy(email)
    {
        
        try {
            const user = await User.findOne(email);
            return user;
            
        } catch (error) {
            console.log('user repo error', error);
            throw error;
        }
    }
}

module.exports = UserRepository;