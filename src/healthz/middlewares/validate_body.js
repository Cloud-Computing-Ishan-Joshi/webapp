const request_body = async(req, res, next) => {
    if (Object.keys(req.body).length || Object.keys(req.query).length) {
        res.set('Cache-Control', 'no-cache');
        res.status(400).send();
    } else {
        next();
    }
};



module.exports = request_body;