const { Tweet } = require("../models");
const CrudRepository = require("./crud-repository");


class  TweetRepository extends CrudRepository{
    constructor()
    {
        super(Tweet);
    }
}

module.exports = TweetRepository;