const invalid_method = async(req, res, next) => {
    const allowedMethods = new Set(['POST']);
    const allowedMethods_self = new Set(['GET', 'POST', 'PUT']);
    res.set('Cache-Control', 'no-cache');
    if (req.path === '/user/self' && !allowedMethods_self.has(req.method)) {
        res.status(405).send();
    }
    if (req.path === '/user' && !allowedMethods.has(req.method)) {
        res.status(405).send();
    } else {
        next();
    }
}

module.exports = invalid_method;