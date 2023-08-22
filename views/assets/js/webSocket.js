



const ws = new WebSocket("ws://localhost:4440");

ws.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);

    if (data.type === "message") {
        addMessage(data.data, false, data.sender, data.autoResponse);
    }
});

function sendMessage() {
    const message = document.getElementById("message").value;

    if (!message) return false;

    ws.send(JSON.stringify({ type: "message", data: message, sender: "ME" }));

    addMessage(message, true, "ME", false);
    document.getElementById("message").value = "";
}

function addMessage(message, isMyMessage, sender, isAutoResponse) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const node = document.createElement("div");
    const text = document.createTextNode(message);

    node.appendChild(text);
    node.classList.add("message");

    if (isMyMessage) {
        node.classList.add("my-message");
        messageContainer.classList.add("my-message-container");
    } else {
        node.classList.add("other-message");
        messageContainer.classList.add("other-message-container");
    }

    if (isAutoResponse) {
        node.classList.add("other-message"); // Set the same style for auto responses
    }

    messageContainer.appendChild(node);

    // Adding the sender's name to the message
    const senderNode = document.createElement("div");
    senderNode.classList.add("message-sender");
    const senderText = document.createTextNode(sender);
    senderNode.appendChild(senderText);
    messageContainer.appendChild(senderNode);

    // Adding automatic response indicator for other messages
    if (isAutoResponse) {
        const autoResponseNode = document.createElement("div");
        autoResponseNode.classList.add("auto-response");
        const autoResponseText = document.createTextNode("Auto Response");
        autoResponseNode.appendChild(autoResponseText);
        messageContainer.appendChild(autoResponseNode);
    }

    document.getElementById("chat").appendChild(messageContainer);
}
