import { connectDB } from "./db.ts";
import "./deps.ts";
import { Application, Router } from "./deps.ts";
import { authRouter, userRouter } from "./handler/index.ts";

const MONGO_URI = Deno.env.get("MONGO_URI") ??
	"mongodb://localhost:27017/expen";
await connectDB(MONGO_URI);

const router = new Router();
const app = new Application();

router.get("/ping", (ctx) => {
	ctx.response.body = { status: "🎊 up and running!" };
});
router.use("/user", userRouter.routes());
router.use("/auth", authRouter.routes());
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = Deno.env.get("PORT") ?? 9292;
console.log(`🚀 Server started on :${PORT}`);
app.listen({ port: Number(PORT) });
