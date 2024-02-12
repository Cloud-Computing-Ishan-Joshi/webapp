const request_body = async(req, res, next) => {
    // res.set('cache-control', 'no-cache');
    const allowedMethodsBody = new Set(['POST', 'PUT']);

    if ((!Object.keys(req.body).length || Object.keys(req.query).length) && allowedMethodsBody.has(req.method)) {
        res.status(400).send();
    }

    if (Object.keys(req.body).length && !allowedMethodsBody.has(req.method)) {
        res.status(400).send();
    }

    const allowedParams = new Set(['username', 'password', 'first_name', 'last_name']);
    const extraParams = Object.keys(req.body).filter(param => !allowedParams.has(param));

    if (extraParams.length > 0 && allowedMethodsBody.has(req.method)) {
        res.status(400).send();
    }
    next();
};


module.exports = request_body;