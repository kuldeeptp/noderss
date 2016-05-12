var mongoose = require('mongoose');
var Feed = require('./models/feed');
mongoose.connect('mongodb://localhost/rss');

var feedCollection = [{
    type: 'News',
    name: 'CBS Marketwatch',
    url:   'http://feeds.marketwatch.com/marketwatch/topstories/',
    icon_image_url: 'http://www.marketwatch.com/rss/marketwatch.gif',
    last_access: new Date()
},
    {
        type: 'News',
        name: 'Daily FX',
        url:   'https://www.dailyfx.com/feeds/forex_market_news',
        icon_image_url: '',
        last_access: new Date()
    },
{
    type: 'News',
    name: 'FX Street',
    url:   'http://xml.fxstreet.com/fundamental/economic-calendar/events.xml',
    icon_image_url: 'http://mediaserver.fxstreet.com/images/fxstreet-provider-logo1-en.gif',
    last_access: new Date()
},
{
    type: 'Blogs',
    name: 'Seeking Alpha',
    url:   'http://seekingalpha.com/tag/forex.xml',
    icon_image_url: '',
    last_access: new Date()
},
{
    type: 'Blogs',
    name: 'Daily FX',
    url:   'https://www.dailyfx.com/feeds/all',
    icon_image_url: '',
    last_access: new Date()
},{
    type: 'Blogs',
        name: 'Calafia Beach Pundit',
        url:   'http://scottgrannis.blogspot.com/feeds/posts/default',
        icon_image_url: '',
        last_access: new Date()
},
{
    type: 'Blogs',
        name: 'Zero Hedge',
    url:   'http://feeds.feedburner.com/zerohedge/feed',
    icon_image_url: '',
    last_access: new Date()
}];


Feed.collection.insert(feedCollection, onInsert);


function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d articles were successfully stored.', docs.length);
    }
}