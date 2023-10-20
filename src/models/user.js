const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required : true,
        unique : true
    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    bio:{
        type:String
    },
    tweets:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ],
});
userSchema.pre('save',function(next){
    const user = this;
    const saltRounds = bcrypt.genSaltSync(9);
    const encryptedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = encryptedPassword;
    next();
})

userSchema.methods.comparePassword = function compare(password)
{
    console.log('current password : ',password);
    const user = this;
    return bcrypt.compareSync(password, user.password);
}
userSchema.methods.generateToken = function generate()
{
    return jwt.sign({
        id:this._id,
        email:this.email
    },'twitter_secret',{
        expiresIn:'2h'
    })
}
const User = mongoose.model('User',userSchema);

module.exports = User;