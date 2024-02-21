module.exports = {
    port: {
        dev: 3000,
        production: process.env.SRV_PORT || 3000,
    },
};