const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        conversationId: { type: String, required: true },
        senderId: { type: String, required: true },
        text: { type: String, required: true },
        edited: { type: Boolean, default: false}
    },
    { timestamps: true }
);

MessageSchema.methods.checkAuth = function (id) {
    if(this.senderId === id) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Message", MessageSchema)