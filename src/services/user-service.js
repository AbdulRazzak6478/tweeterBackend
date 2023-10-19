const { UserRepository } = require('../repositories');
const bcrypt = require('bcrypt')

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
// function checkPassword(plainPassword, encryptedPassword){
//     try {
//         // return bcrypt.compareSync(plainPassword, encryptedPassword);
//         console.log('func called');
//         console.log('passwords : ',plainPassword, encryptedPassword);
//         return bcrypt.compareSync(plainPassword, encryptedPassword)
//     } catch (error) {
//         console.log('check password ',error);
//         throw error;
//     }
// }
async function signIn(data)
{
    try {
        // get user by email to check its present or not
        const user = await userRepository.getUserByEmail(data.email);
        console.log('user details : ',user[0]);
        const encryptedPassword = user[0].password;
        if(!user)
        {
            throw { message : 'No user found'}
        }
        // compare password
        if(!checkPassword(data.password,encryptedPassword))
        {
            throw { message : 'Incorrect Password'}
        }

        // user.comparePassword is not working
        // if(!user.comparePassword(data.password))
        // {
        //     throw { message : 'Incorrect Password'}
        // }
        // user authenticated
        console.log('user successfully signIn');
        console.log(user);
        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw error;
    } 
}
function checkPassword(plainPassword, encryptedPassword){
    try {
        // return bcrypt.compareSync(plainPassword, encryptedPassword);
        console.log('func called');
        console.log('passwords : ',plainPassword, encryptedPassword);
        return bcrypt.compareSync(plainPassword, encryptedPassword)
    } catch (error) {
        console.log('check password ',error);
        throw error;
    }
}

module.exports = {
    signup,
    signIn
}
