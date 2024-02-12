const db = require('../../database/db');
const bcrypt = require('bcrypt');

const User = db.define('User', {
    first_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false,
        is: {
            args: /^(.+)@(.+)\.(.+)$/,
            msg: 'Email format is invalid',
        }
    }
}, {
    hooks: {
        beforeUpdate: (user, options) => {
            if (user.changed('username')) {
                throw new Error('Username cannot be updated');
            }
        },
    }
});

// if (process.env.NODE_ENV !== 'test') {

User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());

    delete values.password;
    values.account_created = values.createdAt;
    delete values.createdAt;
    values.account_updated = values.updatedAt;
    delete values.updatedAt;
    return values;
}

User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.beforeCreate(async(user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});
// }

module.exports = User;