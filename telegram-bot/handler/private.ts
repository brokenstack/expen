import { BotContext } from "../bot.ts";
import { config } from "../config.ts";
import { bold, code, fmt, italic } from "../deps.ts";

type CodeResponse = {
	code: string;
};

export async function startHandler(ctx: BotContext) {
	if (!ctx.message) return;
	const { id, first_name, username } = ctx.message.from;

	const response = await fetch(config.SERVER_URL + "/user/register", {
		method: "POST",
		body: JSON.stringify({
			userid: id,
			first_name,
			username,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		console.log(response.status + " " + response.statusText);
	} else {
		try {
			const data = await response.json() as CodeResponse;
			const fmtStr = fmt`${bold("Welcome to expen!")}

Authentication Code: ${code(data.code)}

${
				italic(
					"Do not share the code with anyone, since this code is used to authenticate you in the application.",
				)
			}
`;
			await ctx.reply(fmtStr.toString(), { entities: fmtStr.entities });
		} catch (e) {
			await ctx.reply(
				"Something went wrong, couldn't get the code for the user. Please try again later.",
			);
			console.error("Couldn't parse response body in `/start`", e);
		}
	}
}
