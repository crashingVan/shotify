async function getImageBitmap () {
    try
    {
        takeScreenshotAndGiveToSw().then((imageBitmapResult) => imageBitmap = imageBitmapResult)
    }
    catch
    {
      console.log(error);
    }
    };


    
    .sidebar::before {
      content: "";
      position: absolute;
      left: 15%;
      top: 11%;
      bottom: 4;
      height: 85%;
      width: 1px;
    border-right:1px solid rgb(209, 209, 213);
  }


  
/**
 *
 * @param {string} name
 * @param {string} id
 * @param {HTMLElement} parentElement
 */
export function createHtmlSession(name, id, parentElement) {
  const divFolderName = document.createElement('div');
  const folderPfad = "/app/views/session/session.html";

  const btnSession = document.createElement('button');
  btnSession.id = id;
  btnSession.classList.add("fa-solid", "fa-file", "iconSpaceIcon");

  const session = document.createElement('a');
  session.href = folderPfad;
  session.insertAdjacentElement("afterbegin", btnSession);


  const nameBtn = document.createElement('button');
  nameBtn.textContent = name;
  nameBtn.classList.add("nameBtn");

  divFolderName.classList.add('iconName')
  divFolderName.appendChild(session);
  divFolderName.appendChild(nameBtn)

  parentElement.appendChild(divFolderName);
  btnSession.addEventListener('click', (e) => {
      saveSessionId(session.id);
  });

}

