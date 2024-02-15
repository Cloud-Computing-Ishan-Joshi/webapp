function handle_body(req, res, buf, encoding) {
    try {
        JSON.parse(buf);
    } catch (e) {
        return res.status(400).end();
    }
}

module.exports = handle_body;