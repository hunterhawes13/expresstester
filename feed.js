// var FeedParser = require('feedparser')
//   , request = require('request');

// var req = request('https://itunes.apple.com/us/rss/topsongs/limit=10/genre=18/explicit=true/xml')
//   , feedparser = new FeedParser();

// req.on('error', function (error) {
//   // handle any request errors
// });
// req.on('response', function (res) {
//   var stream = this;

//   if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

//   stream.pipe(feedparser);
// });


// feedparser.on('error', function(error) {
//   // always handle errors
// });
// feedparser.on('readable', function() {
//   // This is where the action is!
//   var stream = this
//     , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
//     , item;

//   while (item = stream.read()) {
//     console.log(item);
//   }
// });