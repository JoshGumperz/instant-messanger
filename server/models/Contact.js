const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        contacts: { type: Array },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema)