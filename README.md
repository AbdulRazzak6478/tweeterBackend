atlasCloud mongo
 ---> compass import
 ---> cluster
 ---> database
 ---> schema
 ---> model
 --->collection
 --->Document.

  issue that user a JWT token

SignUP `/api/v1/user/signup`
  /createTweet - content,image,TOKEN  --create service
  //

# Requirements

# User should be able to post a tweet
 - `content (250 characters MAX)`
 - `image upload`
 - `likes`
 - `comment tweets`
 - `hashtags(#)`

# Like
 - `like on tweet, like on comment tweet`

# Comment
 - ` content`
 - ` like`
# User 
 - `userName`
 - `authentication`
 - `noOfFollowers`
 - `email/password`
 - `List Of tweets`
 - `Bio`

# (Hashtags)
 - `word`
 - `List of tweets`
 - `rankings`
# Other users should be able to like a tweet
# Other users should be able to comment a tweet
# Other users should be able to retweet a tweet
# Other users should be able to visit a profile or author and follow
# Search By Hashtags
# comment tweets, threading tweets 

# Project setup
- `clone this project`
- `create .env file and setup { port number, URI of mongo db, secretKey, ExpiresTime }`

- ` open terminal and type > npm run dev`

# able to signup
# able to signin
# able to createTweet
# able to create comment on Tweet
# able to create comment on comment
# tweets and comments also store in hashtags model by a objectId
# updating user profile like : tweets,likes,replies when user create tweet,comment or make a like
# user able to delete a tweet and comment which would also update in user profile
# user able to like or unlike a tweet and comment


# How to use this project apis

- create `.env` file in your root directory and add below environment configuration
```
  PORT = <PORT_number>
  UR_INDENTIFIER = <mongoDB_atlas_cloud_db_identifier_link>
  JWT_SECRET = 'secret_key'
  JWT_EXPIRY = 'expire_time'

```
API's 

SignUp `/api/v1/user/signup` POST, request body
```
  email:req.body.email,
  password:req.body.password,
  name:req.body.name,
  bio:req.body.bio,
```
SignIn  `api/v1/user/signin` POST, request body
```
  email:req.body.email,
  password:req.body.password,
  
```



