const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        contactId: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema)