const imageElement = document.querySelector("img");
const endpoint = `https://xkcd.now.sh/?comic=latest`;

const getImage = async () => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    showLoadMessage("Sorry can't load image at present...");
  }
};

const renderImage = async () => {
  const imgData = await getImage();
  if (imageElement) {
    imageElement.src = imgData?.img || "";
    imageElement.alt = imgData?.alt || "Comic image";
  }
};

renderImage();

const showLoadMessage = (message, duration = 3000) => {
  const existingMessage = document.querySelector(".app-message");
  if (existingMessage) existingMessage.remove();

  const messageBox = document.createElement("div");
  messageBox.className = "app-message";
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, duration);
};

window.addEventListener("DOMContentLoaded", getImage);
