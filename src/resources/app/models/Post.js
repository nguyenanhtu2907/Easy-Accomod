const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Post = new Schema({
    owner: { type: String},
    title: { type: String },
    address: { type: Object, default: '' },
    contact: { type: String, default: '' },
    nearby: { type: String, default: '' },
    description: { type: String, default: '' },
    rentcost: { type: String, default: '' },
    electric: {type: String, default: ''},
    water: {type: String, default: ''},
    roomtype: { type: String, default: '' },
    area: { type: String, default: '' },
    infoOwner: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    equipments: { type: Object, default: [] },
    images: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    availabletime: { type: Number, default: 0 },
    saved: { type: Number, default: 0 },
    viewed: { type: Number, default: 0 },
    statusrent: { type: Boolean, default: false },
    fulfill: { type: Boolean, default: false },
    checked: {type: Number, default: 0},
    rates: { type: Array, default: [] },
    key: { type: String, default: '' },
    slug: {type: String, slug: 'title', unique: true},
}, {
    timestamps: true,
})
Post.index({key: 'text'});
module.exports = mongoose.model('Post', Post);