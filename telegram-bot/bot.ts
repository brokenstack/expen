import "./deps.ts";
import { Bot, Context, hydrateReply, ParseModeFlavor } from "./deps.ts";
import { startHandler } from "./handler/private.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
if (!BOT_TOKEN) {
	console.error("BOT_TOKEN not set");
	Deno.exit(1);
}

export type BotContext = ParseModeFlavor<Context>;
const bot = new Bot<BotContext>(BOT_TOKEN);
bot.use(hydrateReply);

bot.command("start", startHandler);

console.info("🚀 Bot started!");
bot.start({ drop_pending_updates: true });
