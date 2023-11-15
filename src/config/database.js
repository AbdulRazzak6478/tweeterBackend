const mongoose = require('mongoose');
const {UR_INDENTIFIER} = require('./server-config')


async function DBconnect(){
    console.log('Connecting to Mongo DB , Please wait .....');
    try {
        const result = await mongoose.connect(UR_INDENTIFIER)
        console.log('Mongo DB connected');
    } catch (error) {
        console.log('error while connection DB',error);
    }
}

module.exports = {
    DBconnect
}