const { DateTime } = require("luxon");
// const v4 = require('uuid').v4;  to install uuidv4: npm install uuid

const events = [
    {
        id: '1',
        category: 'Cooking Workshops',
        title: 'Italian Pasta-Making Workshop',
        host: 'Chef Giovanni Russo',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: `Join us for an immersive Italian Pasta-Making Workshop led by the talented Chef
        Giovanni Russo. Discover the art of crafting fresh pasta from scratch in the heart of Little Italy. 
        Whether you're a novice cook or a seasoned chef, this hands-on experience will leave you with a newfound 
        appreciation for Italian cuisine.`,
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '1.jpg'
    }, 
    {
        id: '2',
        category: 'Cooking Workshops',
        title: 'Sushi Rolling Masterclass',
        host: 'Chef Masaharu Morimoto',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Sushi Rolling Masterclass led by the talented Chef Masaharu Morimoto.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '2.jpg'
    },
    {
        id: '3',
        category: 'Cooking Workshops',
        title: 'Artisan Bread Baking Seminar',
        host: 'Chef Zoe Francois',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Artisan Bread Baking Seminar led by the talented Chef Zoe Francois.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '3.jpg'
    },
    {
        id: '4',
        category: 'Food and Wine Pairing Dinners',
        title: 'Vineyard Vistas & Wine Pairing',
        host: 'Chef Thomas Keller',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Vineyard Vistas & Wine Pairing led by the talented Chef Thomas Keller.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '4.jpg'
    },
    {
        id: '5',
        category: 'Food and Wine Pairing Dinners',
        title: 'Seafood Extravaganza & Wine Tasting',
        host: 'Chef Eric Ripert',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Seafood Extravaganza & Wine Tasting led by the talented Chef Eric Ripert.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '5.jpg'
    },
    {
        id: '6',
        category: 'Food and Wine Pairing Dinners',
        title: 'Global Flavors & Craft Beer Pairing',
        host: 'Chef Rick Bayless',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Global Flavors & Craft Beer Pairing led by the talented Chef Rick Bayless.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '6.jpg'
    },
    {
        id: '7',
        category: 'Chef\'s Table Dinners',
        title: 'Gastronomic Chef\'s Table',
        host: 'Chef Grant Achatz',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Gastronomic Chef\'s Table led by the talented Chef Grant Achatz.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '7.jpg'
    },
    {
        id: '8',
        category: 'Chef\'s Table Dinners',
        title: 'Mystery Ingredient Challenge Dinner',
        host: 'Chef Gordon Ramsay',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Mystery Ingredient Challenge Dinner led by the talented Chef Gordon Ramsay.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '8.jpg'
    }, 
    {
        id: '9',
        category: 'Chef\'s Table Dinners',
        title: 'Farm-to-Fork Chef\'s Table',
        host: 'Chef Alice Waters',
        start: '2023-10-08T13:00',
        end: '2023-10-08T13:30',
        location: 'Online',
        details: 'Join us for an immersive Farm-to-Fork Chef\'s Table led by the talented Chef Alice Waters.',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
        image: '9.jpg'
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
}

exports.updateByID = (id, newEvent, uploadedImage) => {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        newEvent.id = id;
        newEvent.image = uploadedImage ? uploadedImage.filename : events[index].image;
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


exports.formatDateTime = (start, end) => {
    const formattedStart = DateTime.fromISO(start).toLocaleString({
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    const formattedEnd = DateTime.fromISO(end).toLocaleString({
        weekday: 'long',
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    const formattedTime = `${formattedStart} - ${formattedEnd}`;
    return `${formattedTime}`;
}