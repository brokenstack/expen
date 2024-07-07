import "./deps.ts";
import { Bot } from "./deps.ts";
import { startHandler } from "./handler/private.ts";

const BOT_TOKEN = Deno.env.get("BOT_TOKEN");
if (!BOT_TOKEN) {
	console.error("BOT_TOKEN not set");
	Deno.exit(1);
}

const bot = new Bot(BOT_TOKEN);

bot.command("start", startHandler);

console.info("🚀 Bot started!");
bot.start({ drop_pending_updates: true });
