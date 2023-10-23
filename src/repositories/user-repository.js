const { User } = require("../models");
const CrudRepository = require("./crud-repository");
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

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
            if(!user)
            {
                throw new AppError("Not able to found the resource",StatusCodes.NOT_FOUND)
            }
            return user; 
        } catch (error) {
            console.log('user repo error', error);
            throw error;
        }
    }
}

module.exports = UserRepository;