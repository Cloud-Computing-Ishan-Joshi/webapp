function invalid_method(req, res) {
    res.set('Cache-Control', 'no-cache');
    res.status(405).send();
}

module.exports = invalid_method;