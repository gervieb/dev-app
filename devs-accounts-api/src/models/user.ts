import { Types, Schema, Document, model } from "mongoose";

export interface DocumentUser extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: string;
    tokens: [
        {
            provider: string;
            accessToken: string;
            refreshToken: string;
            salt: string;
        }
    ];
    roles: [string];
    active: boolean;
    activationToken: string;
    profile: {
        first_name: string;
        last_name: string;
        img: string;
        trackerOnline: boolean;
        hourly_rate: number;
        timezone: string;
    };
    last_activity: Date;
    referrer: null | Types.ObjectId;
    referralId: string;
    channel_key: string;
    newUser: boolean;
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: String,
        passwordResetToken: String,
        passwordResetExpires: Date,
        tokens: [
            {
                provider: String,
                accessToken: String,
                refreshToken: String,
                salt: String,
            },
        ],
        roles: [String],
        active: {
            type: Boolean,
            default: false,
        },
        activationToken: String,
        profile: {
            first_name: String,
            last_name: String,
            img: String,
            trackerOnline: Boolean,
            hourly_rate: Number,
            timezone: String,
        },
        last_activity: Date,
        referrer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        referralId: String,
    },
    {
        timestamps: true,
    }
);

const User = model<DocumentUser>("User", UserSchema);

export default User;
