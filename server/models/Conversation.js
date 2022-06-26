const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: { type: Array, required: true },
        lastMessage: { type: String, required: true }
    },
    { timestamps: true }
);

ConversationSchema.methods.checkAccess = function (id) {
    if(this.members.includes(id)) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Conversation", ConversationSchema)