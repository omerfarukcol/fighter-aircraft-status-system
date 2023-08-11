const express = require("express");
const websocket = require("websocket");

const {
  startBroadcasting,
  stopBroadcasting,
} = require("./broadcast-manager.js");

const app = express();
const port = 5175;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Create an HTTP server using Express
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a WebSocket server by passing the HTTP server instance
const wss = new websocket.server({
  httpServer: server,
});

// WebSocket connection handler
wss.on("request", (request) => {
  const ws = request.accept(null, request.origin);

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    if (message.utf8Data === "START") {
      console.log("Received START message");
      stopBroadcasting();
      startBroadcasting(ws);
    } else if (message.utf8Data === "STOP") {
      console.log("Received STOP message");
      stopBroadcasting();
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
