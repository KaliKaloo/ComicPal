import html2canvas from "html2canvas";

const exportAsImage = async (element, imageFileName) => {
	const canvas = await html2canvas(element);
	const image = canvas.toDataURL("image/png", 1.0);
	downloadImage(image, imageFileName);
};
const downloadImage = (blob, fileName) => {
	const fakeLink = window.document.createElement("a");
	fakeLink.style = "display:none;";
	fakeLink.download = fileName;

	fakeLink.href = blob;

	document.body.appendChild(fakeLink);
	fakeLink.click();
	document.body.removeChild(fakeLink);

	fakeLink.remove();
};

export default exportAsImage;

// /* ES6 */
// import * as htmlToImage from "html-to-image";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

// const exportAsImage = async (element, imageFileName) => {
//   toPng(element,{cacheBust:true}).then((dataUrl) => {
//     const link = document.createElement('a')
//     link.download = imageFileName
//     link.href=dataUrl
//     link.click()
//   }) .catch((err) => {
//     console.log(err)
//   });

// };

// export default exportAsImage;
