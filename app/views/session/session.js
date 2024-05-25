import { Session } from "../../models/session.js";
import { drawImage } from "../../services/canvas.js";
import { findSessionById, getAll, initDB, saveSession } from "../../services/indexedDb.js";
import { Screenshot } from "../../models/screenshot.js";
import { createSessionView, createTitle, loadScreenshot, videoMainView, videoPreview } from "../../services/html.js";

const videoElem = (/** @type {HTMLVideoElement} */ (document.getElementById("video")));
const startSessionBtn = document.getElementById("start");
const stopSessionBtn = document.getElementById("stop");
const screenshotBtn = document.getElementById("screenshot");
const backToLivestreamBtn = document.getElementById("backToLivestream");
const currentSessionId = localStorage.getItem('sessionId');
const preview = (/**@type {HTMLDivElement} */ (document.getElementById("preview")));

/** @type {MediaStream} */
let mediaStream;
/** @type {IDBDatabase} */
let db;
/** @type {Session} */
let currentSession;

initDB().then((database) => { db = database 
findSessionById(currentSessionId).then((session) => {
  currentSession = session
  createTitle(session.name);
  createSessionView(currentSession.screenshots, preview)
})
});


// Set event listeners for the start and stop buttons
startSessionBtn.addEventListener("click", startCapture);
stopSessionBtn.addEventListener("click", stopCapture);
screenshotBtn.addEventListener("click", takeScreenshot);
backToLivestreamBtn.addEventListener("click", videoMainElementView);


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
    findSessionById(currentSessionId).then(session => {
      console.log(imageBitmap.width, imageBitmap.height);
      //reSizeImageImageBitmap(imageBitmap); //TO-DO
      const screenshot = new Screenshot(imageBitmap);
      session.screenshots.push(screenshot);
      loadScreenshot(imageBitmap, imageBitmap.width, imageBitmap.height, screenshot.id, preview);
      videoPreview();
      saveSession(session);
      //growScreenshot(screenshot.id);
    })
  }); 
}


function videoMainElementView() {
  videoMainView();
}