/**
 * Created by tekmint on 11/05/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ArticleSchema = new Schema({
    feedId: String,
    title: String,
    author: String,
    link:   String,
    content: String,
    type: String,
    guid: String,
    published: Date
});

// the schema is useless so far
// we need to create a model using it
var Article = mongoose.model('Article', ArticleSchema);

// make this available to our articles in our Node applications
module.exports = Article;