import { Document, mongoose, Schema } from "../deps.ts";
import { UserInfo } from "../handler/user.ts";

export interface User extends Document, UserInfo {
	userid: string;
	tg_code: string;
	app_token: string;
}

const UserSchema = new Schema<User>({
	userid: { type: String, unique: true },
	tg_userid: { type: Number, required: true, unique: true },
	username: { type: String, required: true },
	first_name: { type: String, required: true },
	tg_code: { type: String, required: true },
	app_token: { type: String },
}, {
	timestamps: true,
});

UserSchema.pre("save", function (next) {
	this.userid = crypto.randomUUID();
	next();
});

export const UserModel = mongoose.model<User>("users", UserSchema);
