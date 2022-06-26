const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: String, required: true },
        senderId: { type: String, required: true },
        text: { type: String, required: true }
    },
    { timestamps: true }
);

MessageSchema.methods.validate = function (id) {
    if(this.senderId === id) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Message", MessageSchema)