import { ERRORS } from "../constants/errors.ts";
import { MESSAGES } from "../constants/messages.ts";
import { Router, ZodError } from "../deps.ts";
import { z } from "../deps.ts";
import { UserModel } from "../model/user.model.ts";

const router = new Router();

const authTgSchema = z.object({
	code: z.string().min(1),
});

router.post("/telegram", async (ctx) => {
	try {
		const data = authTgSchema.parse(await ctx.request.body.json());
		const user = await UserModel.findOne({ tg_code: data.code }).lean();
		if (!user) {
			ctx.response.status = 404;
			ctx.response.body = {
				message: ERRORS.user_not_found,
			};
			return;
		}

		const appToken = crypto.randomUUID();
		user.app_token = appToken;
		await UserModel.updateOne({ _id: user._id }, user);

		ctx.response.status = 200;
		ctx.response.body = {
			appToken: appToken,
			message: MESSAGES.login_successful,
		};
	} catch (e) {
		console.log(e);
		if (e instanceof ZodError) {
			ctx.response.status = 400;
			ctx.response.body = {
				message: ERRORS.parse_body_error,
			};
			return;
		}

		ctx.response.status = 500;
		ctx.response.body = {
			message: ERRORS.internal_server_error,
		};
	}
});

export default router;
