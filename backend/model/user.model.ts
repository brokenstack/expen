import { Document, mongoose, Schema } from "../deps.ts";
import { UserInfo } from "../handler/user.ts";

export interface User extends Document, UserInfo {
	tg_code: string;
}

const UserSchema = new Schema<User>({
	userid: { type: Number, required: true },
	username: { type: String, required: true },
	first_name: { type: String, required: true },
	tg_code: { type: String, required: true },
}, {
	timestamps: true,
});

export const UserModel = mongoose.model<User>("users", UserSchema);
