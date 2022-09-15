import io from "socket.io-client";

const votingServiceWebsocketBaseUrl =
  process.env.REACT_APP_VOTING_SERVICE_WEBSOCKET_BASE_URL;

var socket = io(votingServiceWebsocketBaseUrl, {
  autoConnect: false,
  reconnection: false,
});

export { socket };
