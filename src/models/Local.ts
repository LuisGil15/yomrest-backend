import mongoose from "mongoose";

const { Schema } = mongoose;

const LocalSchema = new Schema({
    name: {type: String, required: true},
    contact: {type: String, required: true},
    address: {type: String, required: true},
});

LocalSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

module.exports = mongoose.model("Local", LocalSchema);
