import express from "express";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(morgan("combined"));
app.use(express.json());

app.use("/api/status/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/status/readyz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Caching the proxies to avoid creating new proxies for every request
const proxies = {};
const agentProxies = {};

const getProxy = (sandboxId) => {
  const target = `http://sandbox-service-${sandboxId}:5173`;

  if (!proxies[sandboxId]) {
    proxies[sandboxId] = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
    });
  }

  return proxies[sandboxId];
};

const getAgentProxy = (sandboxId) => {
  const target = `http://sandbox-service-${sandboxId}:3000`;

  if (!agentProxies[sandboxId]) {
    agentProxies[sandboxId] = createProxyMiddleware({
      target,
      changeOrigin: true,
      ws: true,
    });
  }

  return agentProxies[sandboxId];
};

app.use((req, res, next) => {
  const host = req.headers.host;
  const sandboxId = host.split(".")[0];

  if (host.split(".")[1] === "agent") {
    return getAgentProxy(sandboxId)(req, res, next);
  } else {
    return getProxy(sandboxId)(req, res, next);
  }
});

export default app;
