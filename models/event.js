const { DateTime } = require("luxon");
// const v4 = require('uuid').v4;  to install uuidv4: npm install uuid

const events = [
    {
        id: '1',
        category: 'Cooking Workshops',
        title: 'Italian Pasta-Making Workshop',
        host: 'Chef Giovanni Russo',
        dateTime: 'Saturday, October 15, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: `Join us for an immersive Italian Pasta-Making Workshop led by the talented Chef
        Giovanni Russo. Discover the art of crafting fresh pasta from scratch in the heart of Little Italy. 
        Whether you're a novice cook or a seasoned chef, this hands-on experience will leave you with a newfound 
        appreciation for Italian cuisine.`,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, 
    {
        id: '2',
        category: 'Cooking Workshops',
        title: 'Sushi Rolling Masterclass',
        host: 'Chef Masaharu Morimoto',
        dateTime: 'Saturday, October 22, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Sushi Rolling Masterclass led by the talented Chef Masaharu Morimoto.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '3',
        category: 'Cooking Workshops',
        title: 'Artisan Bread Baking Seminar',
        host: 'Chef Zoe Francois',
        dateTime: 'Saturday, October 29, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Artisan Bread Baking Seminar led by the talented Chef Zoe Francois.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '4',
        category: 'Food and Wine Pairing Dinners',
        title: 'Vineyard Vistas & Wine Pairing',
        host: 'Chef Thomas Keller',
        dateTime: 'Saturday, November 5, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Vineyard Vistas & Wine Pairing led by the talented Chef Thomas Keller.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '5',
        category: 'Food and Wine Pairing Dinners',
        title: 'Seafood Extravaganza & Wine Tasting',
        host: 'Chef Eric Ripert',
        dateTime: 'Saturday, November 12, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Seafood Extravaganza & Wine Tasting led by the talented Chef Eric Ripert.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '6',
        category: 'Food and Wine Pairing Dinners',
        title: 'Global Flavors & Craft Beer Pairing',
        host: 'Chef Rick Bayless',
        dateTime: 'Saturday, November 19, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Global Flavors & Craft Beer Pairing led by the talented Chef Rick Bayless.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '7',
        category: 'Chef\'s Table Dinners',
        title: 'Gastronomic Chef\'s Table',
        host: 'Chef Grant Achatz',
        dateTime: 'Saturday, November 26, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Gastronomic Chef\'s Table led by the talented Chef Grant Achatz.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id: '8',
        category: 'Chef\'s Table Dinners',
        title: 'Mystery Ingredient Challenge Dinner',
        host: 'Chef Gordon Ramsay',
        dateTime: 'Saturday, December 3, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Mystery Ingredient Challenge Dinner led by the talented Chef Gordon Ramsay.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }, 
    {
        id: '9',
        category: 'Chef\'s Table Dinners',
        title: 'Farm-to-Fork Chef\'s Table',
        host: 'Chef Alice Waters',
        dateTime: 'Saturday, December 10, 2023 | 2:00 PM - 5:00 PM',
        location: 'Online',
        details: 'Join us for an immersive Farm-to-Fork Chef\'s Table led by the talented Chef Alice Waters.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

const categories = ['Cooking Workshops', 'Food and Wine Pairing Dinners', 'Chef\'s Table Dinners', 'Food Festivals', 'Culinary Tours'];

exports.find = () => events;

exports.findByID = id => events.find(event => event.id === id);

exports.create = event => {
    // event.id = v4();
    event.id = String(events.length + 1 + '');
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(event);
    return event;
}

exports.updateByID = (id, newEvent) => {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events[index] = newEvent;
        return true;
    } else {
        console.log('Event not found');
        return false;
    }
}

exports.deleteByID = id => {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        console.log('Event not found');
        return false;
    }
}

exports.getCategories = () => {
    return categories;
}