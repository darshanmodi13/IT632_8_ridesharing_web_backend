const mongo = require('mongoose')

const userSchema = new mongo.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    is_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    is_otp_sent: {
        type: Boolean,
        required: true,
        default: false
    },
    role_id: {
        type: Number,
        required: true
    },
    current_location: {
        type: {
            lat: {
                type: String,
            },
            lng: {
                type: String
            }
        },
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("users", userSchema);