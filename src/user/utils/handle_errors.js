function handle_body(req, res, buf, encoding) {
    try {
        JSON.parse(buf);
    } catch (e) {
        res.status(400).send();
    }
}

module.exports = handle_body;