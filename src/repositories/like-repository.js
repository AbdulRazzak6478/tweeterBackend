const { Like } = require("../models");
const CrudRepository = require("./crud-repository");


class  LikeRepository extends CrudRepository{
    constructor()
    {
        super(Like);
    }
    async findByUserAndLikeable(data)
    {
        try {
            const like = Like.findOne(data);
            return like;
        } catch (error) {
            console.log('like repo ',error);
            throw error;
        }
    }
}

module.exports = LikeRepository;