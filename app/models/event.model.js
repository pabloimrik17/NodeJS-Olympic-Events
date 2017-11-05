const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema
const eventSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String
});

// Middleware
eventSchema.pre('save', function(next) {
    this.slug = slugify(this.name);
    next();
});

// Model
const eventModel = mongoose.model('Event', eventSchema);

module.exports = eventModel;

function slugify(name) {
    return name.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}