function invalid_method(req, res) {
    res.set('Cache-Control', 'no-cache');
    return res.status(405).end();
}

module.exports = invalid_method;