const { Hashtag } = require("../models");
const CrudRepository = require("./crud-repository");


class  HashtagRepository extends CrudRepository{
    constructor()
    {
        super(Hashtag);
    }
}

module.exports = HashtagRepository;