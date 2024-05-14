import { Session } from "../../models/session.js";
import { drawImage } from "../../services/canvas.js";
import { findById, getAll, initDB, saveSession } from "../../services/indexedDb.js";
import { Screenshot } from "../../models/screenshot.js";

const videoElem = (/** @type {HTMLVideoElement} */ (document.getElementById("video")));
const startSessionBtn = document.getElementById("start");
const stopSessionBtn = document.getElementById("stop");
const screenshotBtn = document.getElementById("screenshot");
const screenshotCanvas = document.getElementById("canvasScreenshot");
const showObjectStoreBtn = document.getElementById("showObjectStoreBtn");

/** @type {MediaStream} */
let mediaStream;

// Set event listeners for the start and stop buttons
startSessionBtn.addEventListener("click", startCapture);
stopSessionBtn.addEventListener("click", stopCapture);
screenshotBtn.addEventListener("click", takeScreenshot);
showObjectStoreBtn.addEventListener("click", loadScreenshot);

async function startCapture() {
  try {
    navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "window",
      },
      audio: false,
    }).then(md => {
      videoElem.srcObject = md;
      mediaStream = md;
    });
    // promise mediaStream(getDisplayMedia ist eine Methode, die einen Promise returned).then((mediaStream true) => function)

    // videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    // videoElement is the Source of the Media for htmlObject = await gibt promise zurück, wenn mediaStream vorhanden promise erfüllt und -> array of mediaTracks (mediaStream) in das sourceObject eingesetzt


    //videoElem = video Element von html 
    //videoElem.srcObject = mediaStream der dem videoObjekt zugeordnet wurde
  } catch (err) {
    console.error(err);
  }
}

async function stopCapture() {
  let tracks = mediaStream.getVideoTracks();
  //initializing object tracks through method getTracks from mediaStream -> getting array of mediaTracks

  tracks.forEach((track) => track.stop());
  //forEach is a method for applying a function for every object of an array
  // mediaStream der in videoElem.srcObject gespeichert wurde zurücksetzen
}

function takeScreenshot() {
  let track = mediaStream.getVideoTracks()[0];
  // @ts-ignore
  new ImageCapture(track).grabFrame().then((/** @type {ImageBitmap} */ imageBitmap) => {
    getAll().then(sessions => {
      const screenshot = new Screenshot(imageBitmap);

      sessions[0].screenshots.push(screenshot);

      saveSession(sessions[0]);
    })
  });
}

function loadScreenshot() {
  findById("33d1790d-76d4-4aab-abd7-9a37d1d9fb35").then(session => {
    drawImage(session.screenshots[1].bitmap, screenshotCanvas);
  })
}