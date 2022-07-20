import io from "socket.io-client";

const votingServiceWebsocketBaseUrl =
  process.env.VOTING_SERVICE_WEBSOCKET_BASE_URL;

var socket = io(votingServiceWebsocketBaseUrl);

socket.on("chat message", function (msg) {});

return {};
