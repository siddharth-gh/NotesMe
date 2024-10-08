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
        bookmark: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        updatedAt: {
            type: String,
            required: true
        }
    },

    //options - In Mongoose, options are used to specify various settings and features for your schema.
    {
        timestamps: false,
        versionKey: false
    }
)

module.exports = mongoose.model('notes', noteSchema)