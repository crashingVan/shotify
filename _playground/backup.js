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