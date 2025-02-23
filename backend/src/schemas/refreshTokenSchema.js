import mongoose from "mongoose"

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 })

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;