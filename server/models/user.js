const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new mongoose.Schema(

    //Schema Definitons
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    },

    //options - In Mongoose, options are used to specify various settings and features for your schema.
    {
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        versionKey: false
    }
)

module.exports = mongoose.model('user', userSchema)