//A schema for the user representing the model of the data
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please provide a name"],
            unique: [true,"Name already taken"]
        },
        email: {
            type: String,
            required: [true,"Please provide an email"],
            unique: false,
        },
        password: {
            type: String,
            required: [true,"Please provide a password"],
            unique: false,
            min: 7,
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        firstName: { type: String},
        lastName: { type: String},
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "admin"
        },
    },
    {timestamps: true}
);

const User = mongoose.model("User",UserSchema);
export default User;