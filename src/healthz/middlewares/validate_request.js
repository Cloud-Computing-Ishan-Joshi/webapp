const invalid_method = async(req, res, next) => {
    if (req.method !== 'GET') {
        res.set('Cache-Control', 'no-cache');
        res.status(405).send();
    } else {
        next();
    }
}

module.exports = invalid_method;