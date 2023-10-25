const { UserRepository } = require('../repositories');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { Auth } = require('../utils/common');
const { ServerConfig } = require('../config');
const userRepository = new UserRepository();

async function signup(data)
{
    try {
        const user = await userRepository.create(data);
        console.log(user);
        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Cannot SignUp the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
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
        if(!Auth.checkPassword(data.password,encryptedPassword))
        {
            throw { message : 'Incorrect Password'}
        }

        // user.comparePassword is not working
        // if(!user.comparePassword(data.password))
        // {
        //     throw { message : 'Incorrect Password'}
        // }
        // user authenticated
        // const token = User.generateToken();
        const input = {
            id : user[0].id,
            email : user[0].email
        }
        const token = Auth.createToken(input);
        return {user,token};
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Not able to signup the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
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
        algorithm: "HS256",
        expiresIn:'2h'
    })
}

async function isAuthenticated(token)
{
    try {
        if(!token)
        {
            throw new AppError('bearer-token :jwt-token, missing jwt-token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        // const response = generateToken(token);
        // const response = jwt.verify(token,ServerConfig.JWT_SECRET);
        console.log('token decoded : ',response);
        const user = await userRepository.get(response.id);
        if(!user)
        {
            throw new AppError('no user found',StatusCodes.BAD_REQUEST);
        }
        return user.id; 
    } catch (error) {
        if(error.name == 'JsonWebTokenError')
        {
            throw new AppError('Invalid jwt token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError')
        {
            throw new AppError('jwt token expired',StatusCodes.BAD_REQUEST);
        }
        console.log('user service signin authenticated :',error.message);
        throw new AppError(`Something went wrong , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    signup,
    signIn,
    isAuthenticated
}
