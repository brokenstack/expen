import { ERRORS } from "../constants/errors.ts";
import { Router, ZodError } from "../deps.ts";
import { z } from "../deps.ts";
import { UserModel } from "../model/user.model.ts";

const router = new Router();

export const UserSchema = z.object({
	tg_userid: z.number(),
	username: z.string(),
	first_name: z.string(),
});

export type UserInfo = z.infer<typeof UserSchema>;

router.post("/register", async (ctx) => {
	try {
		const body = UserSchema.parse(await ctx.request.body.json());
		const user = await UserModel.findOne({ tg_userid: body.tg_userid }).lean();
		if (user && user.tg_code) {
			ctx.response.status = 200;
			ctx.response.body = {
				"code": user.tg_code,
			};
			return;
		}

		const code = crypto.randomUUID();
		await UserModel.create({
			tg_userid: body.tg_userid,
			username: body.username,
			first_name: body.first_name,
			tg_code: code,
		});

		ctx.response.status = 200;
		ctx.response.body = {
			"code": code,
		};
	} catch (e) {
		if (e instanceof ZodError) {
			ctx.response.status = 400;
			ctx.response.body = {
				error: ERRORS.parse_body_error,
			};
			return;
		}

		ctx.response.status = 500;
		ctx.response.body = {
			error: ERRORS.internal_server_error,
		};
	}
});

export default router;
