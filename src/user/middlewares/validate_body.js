const request_body = async(req, res, next) => {
    // res.set('cache-control', 'no-cache');
    const allowedMethodsBody = new Set(['POST', 'PUT']);

    if ((!Object.keys(req.body).length || Object.keys(req.query).length) && allowedMethodsBody.has(req.method)) {
        console.log("*********** NoBody ***********");
        return res.status(400).end();
    }

    if (Object.keys(req.body).length && !allowedMethodsBody.has(req.method)) {
        console.log("*********** Allow Method ***********");
        return res.status(400).end();
    }

    const allowedParams = new Set(['username', 'password', 'first_name', 'last_name']);
    const extraParams = Object.keys(req.body).filter(param => !allowedParams.has(param));

    if (extraParams.length > 0 && allowedMethodsBody.has(req.method)) {
        console.log("*********** ExtraParams ***********");
        return res.status(400).end();
    }
    next();
};


module.exports = request_body;