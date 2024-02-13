const onlyJsonBody = (req, res, next) => {
    res.set('cache-control', 'no-cache');
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).end();
    } else {
        next();
    }
}