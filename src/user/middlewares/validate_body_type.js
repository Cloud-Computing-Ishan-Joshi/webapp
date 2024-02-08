const onlyJsonBody = (req, res, next) => {
    res.set('cache-control', 'no-cache');
    if (req.headers['content-type'] !== 'application/json') {
        res.status(415).send();
    } else {
        next();
    }
}