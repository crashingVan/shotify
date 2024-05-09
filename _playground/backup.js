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