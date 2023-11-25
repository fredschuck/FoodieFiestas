exports.validateId = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Cannot find event with ID: ' + id);
        err.status = 400;
        next(err);
    }
    next();
};