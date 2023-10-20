const { UserRepository } = require('../repositories');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

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
        // const token = User.generateToken();
        const input = {
            id:user.id,
            email : user.email
        }
        const token = generateToken(input);
        console.log('token',token);
        console.log('user details ',user);
        return {user,token};
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
function generateToken(input){
    return jwt.sign(input,'twitter_secret',{
        expiresIn:'2h'
    })
}

module.exports = {
    signup,
    signIn
}
