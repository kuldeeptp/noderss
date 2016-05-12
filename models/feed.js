/**
 * Created by tekmint on 11/05/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var FeedSchema = new Schema({
    type: String,
    name: String,
    url:   String,
    icon_image_url: String,
    last_access: Date
});

// the schema is useless so far
// we need to create a model using it
var Feed = mongoose.model('Feed', FeedSchema);

// make this available to our articles in our Node applications
module.exports = Feed;