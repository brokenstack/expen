import { Router } from "../deps.ts";
import { z } from "../deps.ts";
import { UserModel } from "../model/user.model.ts";

const router = new Router();

export const UserSchema = z.object({
	userid: z.number(),
	username: z.string(),
	first_name: z.string(),
});

export type UserInfo = z.infer<typeof UserSchema>;

router.post("/register", async (ctx) => {
	try {
		const body = UserSchema.parse(await ctx.request.body.json());
		const user = await UserModel.findOne({ userid: body.userid }).lean();
		if (user && user.tg_code) {
			ctx.response.status = 200;
			ctx.response.body = {
				"code": user.tg_code,
			};
		}

		const code = crypto.randomUUID();
		await UserModel.create({
			userid: body.userid,
			username: body.username,
			first_name: body.first_name,
			tg_code: code,
		});

		ctx.response.status = 200;
		ctx.response.body = {
			"code": code,
		};
	} catch (e) {
		console.error("Couldn't parse request body!", e);
		ctx.response.status = 400;
		ctx.response.body = {
			error: "Couldn't parse request body!",
		};
	}
});

export default router;
