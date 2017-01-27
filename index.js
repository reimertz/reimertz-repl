"use strict"



const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: 'snNdlCGbSjq7fsPERjgOz8oFe',
  consumer_secret: 'VQyUGOIayiHyT5mL1jPqEh1thvJBbZjDBRsOY68r0P3L9f5Qdl',
  access_token_key: '79005145-AVz1Q9vVkeZMSbcsbRgpP7qYT9bRcQ8vmYyHvjvKQ',
  access_token_secret: 'j5sFaO6KABjODhw9rVA0r2da4uwAmCtmi4cptOcsL4TUC'
})

let repl;

persistData(){
  store.set('evaledTweets', repl, function(err, result){
    if(err) return console.log(err);
    console.log('done')
  });
}

function addToQ(evaledTweets) {
    if(err) return;

    repl.lastId = valedTweet[0]
    repl.concagt(evaledTweets.reverse())

    persistData();

}

function cleanTweet(tweet){
  return tweet.text.replace('@reimertz js ', '')
}

function checkForNewTweets() {
  client.get('search/tweets', {q: '@reimertz js ', since_id: lastId}, function(error, tweets, response){
    if (error) return console.log(error)
    let evaledTweets = tweets.statuses.map((t) =>{
      console.log(cleanTweet(t));

      return {
        text: cleanTweet(t),
        id: t.id_str,
        user: t.user.screen_name
      }
    }).map((o) => {
      try {
        o.result = eval(o.text)
        return o
      }
      catch(e) {
        o.result = false
        return o
      }
    }).filter((o) => { return !!o.result })


    addToQ(evaledTweets)
    //replyWithREPLResult

  })
}

initDatastore(cb){
  store.get('evaledTweets', function(err, result){
    relp = result;
    cb();
  });
}


initDatastore(checkForNewTweets);




