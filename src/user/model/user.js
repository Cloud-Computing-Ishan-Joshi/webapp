const db = require('../../database/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

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
        },
        unique: true
    },
    // verify : has only three status : created, verified, expired
    verify: {
        type: db.Sequelize.STRING,
        allowNull: false,
        defaultValue: 'created'
    },
    // token expired if not verified in 2 minutes
    token_expired: {
        type: db.Sequelize.DATE,
        // defaultValue: now + 2 minutes
        defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'2 minutes\''),
        allowNull: false
    },
    token: {
        type: db.Sequelize.STRING,
        // allowNull: false
    }
}, {
    hooks: {
        beforeUpdate: (user, options) => {
            const check_token_expired = new Date(user.token_expired) < new Date();
            if (check_token_expired) {
                user.verify = 'expired';
            }
            if (user.changed('username')) {
                throw new Error('Username cannot be updated');
            }
        },
        afterFind: async(user, options) => {
            if (user) {
                const check_token_expired = new Date(user.token_expired) < new Date();
                if (check_token_expired) {
                    user.verify = 'expired';
                    await user.save();
                }
            }
            return user;
        },
        beforeCreate: async(user, options) => {
            console.log('beforeCreate')
            const token = uuid.v4();
            console.log(token);
            user.token = token;
        },
        afterCreate: async(user, options) => {
            await user.reload();
            await user.save();
        },
        afterUpdate: async(user, options) => {
            await user.reload();
            await user.save();
        }
    }
});

// if (process.env.NODE_ENV !== 'test') {

User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.verify;
    if (process.env.NODE_ENV !== 'test'){
        delete values.token;
    }
    // delete values.token_expired;
    delete values.password;
    values.account_created = values.createdAt;
    delete values.createdAt;
    values.account_updated = values.updatedAt;
    delete values.updatedAt;
    return values;
}

User.prototype.verifyUser = async function() {
    check_token_expired = new Date(this.token_expired) < new Date();
    if (check_token_expired) {
        this.verify = 'expired';
        await this.save();
        return this.verify;
    } else {
        this.verify = 'verified';
        await this.save();
        return this.verify;
    }
}

// User.prototype.checkTokenExpired = async function() {
//     const check_token_expired = new Date(this.token_expired) < new Date();
//     if (check_token_expired) {
//         this.verify = 'expired';
//         await this.save();
//         return this.verify;
//     }
// }

User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

User.beforeCreate(async(user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});
// }

module.exports = User;