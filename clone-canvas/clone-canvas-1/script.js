function handlFileSelect(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;

      img.onload = function () {

        _copyImage(img)

      };
    };
  }
}

function _copyImage(image){
  
  const sourceCanvas = document.getElementById("sourceCanvas");
  sourceCanvas.width = image.width;
  sourceCanvas.height = image.height;
  const sourceCtx = sourceCanvas.getContext("2d");
  sourceCtx.drawImage(image, 0, 0, image.width, image.height);

  const targetCanvas = document.getElementById("targetCanvas");
  targetCanvas.width = image.width ;
  targetCanvas.height = image.height;
  const targetCtx = targetCanvas.getContext("2d");

  const sourceImg = sourceCtx.getImageData(0, 0, image.width, image.height);
  const targeteImg = targetCtx.getImageData(0,0,image.width,image.height);

  for (let i = 0; i < sourceImg.data.length; i += 4) {

    _copysinglePixel(targeteImg,sourceImg,i);

  };
 
  targetCtx.putImageData(targeteImg, 0,0);

}

function _copysinglePixel(targeteImage,sourceImage,indx) {
  
  targeteImage.data[indx] = sourceImage.data[indx];
  targeteImage.data[indx+1] = sourceImage.data[indx+1];
  targeteImage.data[indx+2] = sourceImage.data[indx+2];
  targeteImage.data[indx+3] = sourceImage.data[indx+3];

}


document
  .getElementById("fileInput")
  .addEventListener("change", handlFileSelect);