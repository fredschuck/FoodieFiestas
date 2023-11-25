exports.index = (req, res) => {
    res.render('./index.ejs',{
        cssFileName: 'index',
        title: 'Foodie Fiesta'
    });
};

exports.about = (req, res) => {
res.render('./about', {
    cssFileName: 'index',
    title: 'About'
});
};

exports.contact = (req, res) => {
res.render('./contact', {
    cssFileName: 'index',
    title: 'Contact'
});
};