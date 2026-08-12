const imageElement = document.querySelector("img");
const endpoint = `https://xkcd.now.sh/?comic=latest`;

let imageCache = null;
let imagePromise = null;

const state = {
  imgData: {},
};

async function fetchImageData() {
  if (imageCache) return imageCache;
  if (!imagePromise) {
    imagePromise = fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        imageCache = data;
        return imageCache;
      });
  }
  return imagePromise;
}

async function setup() {
  try {
    const fetchedImgData = await fetchImageData();
    state.imgData = fetchedImgData;
    renderImage();
    const loadingMessage = document.querySelector(".app-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  } catch (error) {
    showMessage("Sorry, we could not load the image right now.");
  }
}

function renderImage() {
  if (imageElement && state.imgData.img) {
    imageElement.src = state.imgData.img;
    imageElement.alt = state.imgData.alt || "Comic image";
  }
}

function showMessage(message, duration = 3000) {
  const existingMessage = document.querySelector(".app-message");
  if (existingMessage) existingMessage.remove();

  const messageBox = document.createElement("div");
  messageBox.className = "app-message";
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
    messageBox.remove();
  }, duration);
}

window.addEventListener("DOMContentLoaded", setup);
