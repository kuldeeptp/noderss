/**
 * Created by tekmint on 11/05/16.
 */
var Q = require("q");
require('q-foreach')(Q);
var reader = require("./custom_module/feed-read");
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Article = require('./models/article');
var Feed = require('./models/feed');

mongoose.connect('mongodb://localhost/rss');
//var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
//var url = 'mongodb://localhost:27017/rss';
var articleCollection =[];
function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d articles were successfully stored.', docs.insertedCount);
        articleCollection = [];
    }
}
var guids;
//var prom = Article.find({}, function(err, result){
//
//}).select('guid')

var prom = Article.find().select('guid').exec();

prom.then(function(article) {
    // just getting the stuff for the next query
    guids = article.map(function(a) {
        return a.guid;
    });
   // console.log(guids);
});

Feed.find({}, function(err, result){
    // get All feeds
        if (err) {
            console.log(err);
        } else if (result.length) {

            var count=0;
            Q.forEach(result,function(feed){
                var defer = Q.defer();
                //console.log('feed1 object : ',feed);
                reader(feed.url, function(err, articles) {
                    if (err) throw err;
                    articles.forEach(function(article){
                        if(guids.indexOf(article.guid)){
                            return;
                        }
                        articleCollection.push({
                            feedId: article._id ? article._id:'',
                            guid: article.guid ? article.guid : '',
                            title: article.title,
                            content: article.content ? article.content:'',
                            author: article.author? article.author : '',
                            link: article.link?article.link : '',
                            published: article.published? article.published : '',
                            type: feed.type
                        });

                    });
                    defer.resolve(articleCollection);
                    Article.collection.insert(articleCollection, onInsert);

                });
                return defer.promise;
            }).then(function (articleCollection) {
               // console.log('articles completed!',articleCollection.length);
                mongoose.connection.close(function () {
                    console.log('Mongoose disconnected on app termination');
                   //process.exit(0);
                });
            });

        } else {
            console.log('No document(s) found with defined "find" criteria!');
        }

})