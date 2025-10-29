// // dreamy soft filter
// export const applyDreamyGlowFilter = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, intensity: number = 1) => {
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const data = imageData.data;

//   // Step 1 — Brighten image slightly
//   for (let i = 0; i < data.length; i += 4) {
//     data[i]     = Math.min(255, data[i] * 1.1); // R
//     data[i + 1] = Math.min(255, data[i + 1] * 1.1); // G
//     data[i + 2] = Math.min(255, data[i + 2] * 1.1); // B
//   }

//   ctx.putImageData(imageData, 0, 0);

//   // Step 2 — Create a blurred version of the image (simulate Gaussian blur)
//   const blurCanvas = document.createElement("canvas");
//   blurCanvas.width = canvas.width;
//   blurCanvas.height = canvas.height;
//   const blurCtx = blurCanvas.getContext("2d")!;
//   blurCtx.filter = `blur(${8 * intensity}px)`; // heavy diffusion
//   blurCtx.drawImage(canvas, 0, 0);

//   // Step 3 — Extract highlights (threshold)
//   const blurredData = blurCtx.getImageData(0, 0, canvas.width, canvas.height);
//   const bData = blurredData.data;
//   for (let i = 0; i < bData.length; i += 4) {
//     const brightness = (bData[i] + bData[i + 1] + bData[i + 2]) / 9;
//   }
//   blurCtx.putImageData(blurredData, 0, 0);

//   // Step 4 — Overlay highlights with soft light blend
//   ctx.globalAlpha = 0.6;
//   ctx.drawImage(blurCanvas, 0, 0);
//   ctx.globalAlpha = 1.0;

//   // Step 5 — Slight desaturation for cinematic tone
//   const finalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   const fd = finalData.data;
//   for (let i = 0; i < fd.length; i += 4) {
//     const avg = (fd[i] + fd[i + 1] + fd[i + 2]) / 3;
//     fd[i]     = fd[i] * 0.9 + avg * 0.1;
//     fd[i + 1] = fd[i + 1] * 0.9 + avg * 0.1;
//     fd[i + 2] = fd[i + 2] * 0.9 + avg * 0.1;
//   }
//   ctx.putImageData(finalData, 0, 0);
// };

// dreamy soft filter with more brightness, subtle pink
export const applyDreamyGlowFilter = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1
) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Step 1 — Increase brightness, minimal pink
  for (let i = 0; i < data.length; i += 4) {
    // Brightness
    data[i]     = Math.min(255, data[i] * 1.50); // R
    data[i + 1] = Math.min(255, data[i + 1] * 1.50); // G
    data[i + 2] = Math.min(255, data[i + 2] * 1.50); // B

    // Very subtle pink tint (reduced)
    data[i]     = Math.min(255, data[i] + 10 * intensity); // slight red boost
    //data[i + 2] = data[i + 2] * 1.0;
  }

  ctx.putImageData(imageData, 0, 0);

  // Step 2 — Create blurred version (simulate Gaussian blur)
  const blurCanvas = document.createElement("canvas");
  blurCanvas.width = canvas.width;
  blurCanvas.height = canvas.height;
  const blurCtx = blurCanvas.getContext("2d")!;
  blurCtx.filter = `blur(${6 * intensity}px)`;
  blurCtx.drawImage(canvas, 0, 0);

  // Step 3 — Overlay highlights with soft light blend
  ctx.globalAlpha = 0.6;
  ctx.drawImage(blurCanvas, 0, 0);
  ctx.globalAlpha = 1.0;

  // Step 4 — Slight desaturation for cinematic tone + maintain very subtle pink
  const finalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const fd = finalData.data;
  for (let i = 0; i < fd.length; i += 4) {
    const avg = (fd[i] + fd[i + 1] + fd[i + 2]) / 3;

    // soft desaturation
    fd[i]     = fd[i] * 0.9 + avg * 0.1;
    fd[i + 1] = fd[i + 1] * 0.9 + avg * 0.1;
    fd[i + 2] = fd[i + 2] * 0.9 + avg * 0.1;

    // very subtle pink
    fd[i] += 2 * intensity; // tiny red boost
  }
  ctx.putImageData(finalData, 0, 0);
};
