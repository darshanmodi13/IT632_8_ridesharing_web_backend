const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
        
        driver_id : {
            type : mongoose.Types.ObjectId,
            required : true
        },
        passenger_id : {
            type : mongoose.Types.ObjectId,
            required : true
        },
        current_status_id : {
            type : mongoose.Types.ObjectId,
            required : true
        },
        accept : {
            type : Boolean,
            required : true
        },
        stating_location : {
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
        ending_location : {
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
        starting_address_line1 : {
            type : String,
            required : true
        },
        starting_address_line2 : {
            type : String
        },
        starting_city : {
            type : String,
            required : true
        },
        starting_state : {
            type : String,
            required : true
        },
        end_address_line1 : {
            type : String,
            required : true
        },
        end_address_line2 : {
            type : String
        },
        end_city : {
            type : String,
            required : true
        },
        end_state : {
            type : String,
            required : true
        },
        fare : {
            type : Number,
            required : true
        },
        payment_method_id : {
            type : String,
            required : true
        },
        payment_date : {
            type : Date,
            required : true
        },
        instructions : {
            type : String
        }
    }
)

 module.exports = mongoose.model("Rides",ridesSchema);
