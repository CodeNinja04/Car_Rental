const mongoose = require('mongoose')

const carSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter car name'],
        },
        model: {
            type: String,
            required: [true, 'Please enter car model'],
            //unique: true,
        },
        sku: {
            type: String,
            required: [true, 'Please enter sku'],
        },

        price:{

            type : Number,
            required:[true,"Please enter car price"],

        },

        
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Car', carSchema)