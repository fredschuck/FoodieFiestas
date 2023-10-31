const mongoose = require("mongoose");
const Schema = require('mongoose').Schema;

const categories = ['Cooking Workshops', 'Food and Wine Pairing Dinners', 'Chef\'s Table Dinners', 'Food Festivals', 'Culinary Tours'];

const eventSchema = new Schema({
    category: {type: String, required: [true, 'Category is required'], enum: categories},
    title: {type: String, required: [true, 'Title is required']},
    host: {type: String, required: [true, 'Host is required']},
    location: {type: String, required: [true, 'Location is required']},
    start: {type: Date, required: [true, 'Start time is required']},
    end: {type: Date, required: [true, 'End time is required']},
    details: {type: String, required: [true, 'Details are required'], 
        minLength: [10, 'Details must be at least 10 characters long']},
    image: {type: String, required: [true, 'Image is required']}
},
{timestamps: true}
);

eventSchema.methods.formatDateTime = function() {
    const startDate = new Date(this.start); 
    const endDate = new Date(this.end);

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        timeZoneName: 'short' 
    };

    return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
};

eventSchema.methods.processDateTime = function(timeObject) {
    const datetime = new Date(timeObject);
    const shiftedDate = new Date(datetime.getTime() - 4 * 60 * 60 * 1000);
    const formattedDate = shiftedDate.toISOString().slice(0, 16);

    return formattedDate;
};

function validateCategory(category) {
    return categories.includes(category);
}

module.exports = {
    categories: categories,
    validateCategory: validateCategory,
    Event: mongoose.model('Event', eventSchema, 'events')
};