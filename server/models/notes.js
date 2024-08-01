const mongoose = require('mongoose');
const { Schema } = mongoose

const noteSchema = new mongoose.Schema(

    //Schema Definitons
    {
        description: {
            type: String
        },
        theme: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        updatedAt: {
            type: String,
            default: () => new Date().toUTCString()
        }
    },

    //options - In Mongoose, options are used to specify various settings and features for your schema.
    {
        timestamps: false,
        versionKey: false
    }
)

module.exports = mongoose.model('notes', noteSchema)