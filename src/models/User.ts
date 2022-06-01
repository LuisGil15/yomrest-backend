import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: { type: String, unique: true },
    password: String
});

UserSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("User", UserSchema);
