/**
 * Apply a twilight filter with teal/cyan overlay
 * @param ctx CanvasRenderingContext2D - The 2D context of the canvas
 * @param canvas HTMLCanvasElement - The canvas element where the image is drawn
 * @param intensity number - 0 to 1 (filter strength)
 */
export function applyTwilightFilter(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);

  // First overlay - bright teal
  ctx.fillStyle = `rgba(7, 207, 161, ${0.2 * intensity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Second overlay with soft-light blend mode - blue tones
  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle = `rgba(48, 145, 172, ${0.2 * intensity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Reset blend mode
  ctx.globalCompositeOperation = "source-over";
}