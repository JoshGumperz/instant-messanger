const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        contactId: { type: String, required: true },
    },
    { timestamps: true }
);

MessageSchema.methods.validate = function (id) {
    if(this.userId === id) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Contact", ContactSchema)