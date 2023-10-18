const { Hashtag } = require("../models");
const CrudRepository = require("./crud-repository");


class  HashtagRepository extends CrudRepository{
    constructor()
    {
        super(Hashtag);
    }
    async bulkCreate(data)
    {
        try {
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log('hashtag repo bulkCreate error : ',error);
            throw error;
        }
    }
    async getHashtagByName(tags){
        try {
            const hashtag = await Hashtag.find({
                text:tags
            });
            return hashtag;
        } catch (error) {
            console.log('hashtag repo getHashtagByName error : ',error);
            throw error;
        }
    }
}

module.exports = HashtagRepository;