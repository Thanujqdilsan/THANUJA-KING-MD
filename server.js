// server.js
// Lightweight Express keep-alive + health server for THANUJA-KING-MD

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import process from "process";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", 1); // for Railway/Render/Koyeb

// --- Middlewares ---
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(morgan("tiny"));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

// --- Simple in-memory status ---
let BOOT_TIME = new Date();
let LAST_PING = new Date();

// HEALTH
app.get("/", (_req, res) => {
  res.status(200).json({
    app: "THANUJA-KING-MD",
    status: "ok",
    uptime_sec: Math.floor((Date.now() - BOOT_TIME.getTime()) / 1000),
    last_ping_iso: LAST_PING.toISOString(),
  });
});

// OPTIONAL: expose simple metrics (no auth)
app.get("/metrics", (_req, res) => {
  const uptime = Math.floor((Date.now() - BOOT_TIME.getTime()) / 1000);
  res.type("text/plain").send(
    [
      `app_name{app="THANUJA-KING-MD"} 1`,
      `uptime_seconds ${uptime}`,
      `last_ping_ms ${Date.now() - LAST_PING.getTime()}`
    ].join("\n")
  );
});

// Webhook (if you need to receive events)
app.post("/webhook", (req, res) => {
  // TODO: handle events from your hosting / external services
  // console.log("Webhook:", req.body);
  res.status(200).json({ received: true });
});

// Keep-alive self-ping (can be used by uptime services)
app.get("/ping", (_req, res) => {
  LAST_PING = new Date();
  res.status(200).send("pong");
});

// Graceful shutdown
function shutdown(signal) {
  console.log(`[server] ${signal} received, closing...`);
  server.close(() => {
    console.log("[server] Closed. Bye!");
    process.exit(0);
  });
  // force exit if not closed in time
  setTimeout(() => process.exit(1), 10_000).unref();
}

const server = app.listen(PORT, () => {
  console.log(`[server] THANUJA-KING-MD health server running on :${PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
