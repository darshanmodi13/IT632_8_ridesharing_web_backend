

const mongo = require('mongoose');
const offer_rides = new mongo.Schema({
    current_location: {
        type : {
            lat : {
                type : String,
            },
            lng : {
                type : String
            }
        },
        required : true
    },

    starting_location: {
        type : {
            lat : {
                type : String,
            },
            lng : {
                type : String
            }
        },
        required : true
    },

    starting_address_line1: {
        type: String,
        required: true,
    },

    starting_address_line2: {
        type: String,
        required: true,
    },

    starting_city: {
        type: String,
        required: true,
    },

    starting_state: {
        type: String,
        required: true,
    },

    ending_location: {
        type : {
            lat : {
                type : String,
            },
            lng : {
                type : String
            }
        },
        required : true
    },

    end_address_line1: {
        type: String,
        required: true,
    },

    end_city: {
        type: String,
        required: true,
    },

    end_state: {
        type: String,
        required: true,

    }
})

module.exports = mongoose.model("offer_rides", userSchema);
