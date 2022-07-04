const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        members: { type: Array, required: true },
        memberNames: { type: Array, required: true }
    },
    { timestamps: true }
);

ConversationSchema.methods.checkAuth = function (id) {
    if(this.members.includes(id)) {
        return true
    } else { 
        return false
    }
}

module.exports = mongoose.model("Conversation", ConversationSchema)