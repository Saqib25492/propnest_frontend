// lib/ws/socketClient.js

let socket = null;

export function getSocket() {
  if (socket && socket.readyState <= 1) {
    return socket;
  }

  socket = new WebSocket('wss://propnest-fnhzaaakhudzcfd6.uaenorth-01.azurewebsites.net'); // change to wss://your-api-url in production

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  socket.onclose = () => {
    console.warn('WebSocket closed. Reconnect logic can go here.');
  };

  return socket;
}
