const { UserRepository } = require('../repositories');


const userRepository = new UserRepository();

async function signup(data)
{
    try {
        const user = await userRepository.create(data);
        console.log(user);
        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw error;
    }
}


module.exports = {
    signup
}
