const { TweetRepository , HashtagRepository } = require('../repositories');


const tweetRepository = new TweetRepository();
const hashtagRepository = new HashtagRepository();

async function createTweet(data)
{
    try {
        const content = data.content;
        const tags = content.match(/#+[a-zA-Z0-9(_)]+/g).map(tag => tag.substring(1).toLowerCase());
        const tweet = await tweetRepository.create(data);

        // storing the new hashtags ----
        const allPresentHashtags = await hashtagRepository.getHashtagByName(tags);
        let textOfPresentTags = allPresentHashtags.map(tags => tags.text);
        let newTags = tags.filter(tag => !textOfPresentTags.includes(tag));
        newTags = newTags.map(tag => {
            return {
                text : tag,
                tweets : [tweet.id],
            }
        });
        const bulk = await hashtagRepository.bulkCreate(newTags);

        // storing tweet in present hashtags
        allPresentHashtags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;
    } catch (error) {
        console.log('tweet service create tweet error :',error);
        throw error;
    }
}

async function getAllTweets()
{
    try {
        const response = await tweetRepository.getAll();
        return response;
    } catch (error) {
        console.log('tweet service get Tweets error',error);
        throw error;
    }
}
async function getTweet(id)
{
    try {
        const response = await tweetRepository.get(id);
        return response;
    } catch (error) {
        console.log('tweet service get Tweet error',error);
        throw error;
    }
}

module.exports = {
    createTweet,
    getAllTweets,
    getTweet
}
