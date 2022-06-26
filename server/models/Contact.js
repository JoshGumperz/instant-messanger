const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        contactId: { type: String, required: true }
    },
    { timestamps: true }
);

ContactSchema.methods.checkAuth = function (id) {
    if(this.userId === id) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Contact", ContactSchema)