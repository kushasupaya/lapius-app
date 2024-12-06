// const ws: WebSocket = new WebSocket(
//   "wss://h6jh34fm4g.execute-api.us-east-1.amazonaws.com/production/"
// );

// ws.onopen = () => {
//   console.log("WebSocket connected");
// };

// ws.onmessage = (event) => {
//   const data = JSON.parse(event.data);
//   console.log("Message from server:", data);

//   // Update the UI with the received description
//   if (data.description) {
//     const descriptionElement = document.getElementById("description");
//     if (descriptionElement) {
//       descriptionElement.textContent = data.description;
//     }
//   }
// };

// ws.onclose = () => {
//   console.log("WebSocket disconnected");
// };

// ws.onerror = (error) => {
//   console.error("WebSocket error:", error);
// };
