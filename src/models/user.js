const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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
const User = mongoose.model('User',userSchema);

module.exports = User;