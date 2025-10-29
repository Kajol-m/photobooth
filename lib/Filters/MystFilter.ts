// /lib/Filters/Myst.ts
export const applyMystFilter = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1
) => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Extract original colors
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // --- Apply Myst Filter adjustments ---

    // 1. Slight brightness
    r += 15 * intensity;
    g += 15 * intensity;
    b += 15 * intensity;

    // 2. Reduce contrast
    r = r + (128 - r) * 0.1 * intensity;
    g = g + (128 - g) * 0.1 * intensity;
    b = b + (128 - b) * 0.1 * intensity;

    // 3. Slight saturation reduction
    const avg = (r + g + b) / 3;
    r = r + (avg - r) * 0.05 * intensity;
    g = g + (avg - g) * 0.05 * intensity;
    b = b + (avg - b) * 0.05 * intensity;

    // 4. Purple-blue tint
    r = r * (1 - 0.1 * intensity) + 15 * intensity; // subtle red lift
    b = b + 25 * intensity; // boost blue

    // Clamp values
    data[i] = Math.min(255, Math.max(0, r));
    data[i + 1] = Math.min(255, Math.max(0, g));
    data[i + 2] = Math.min(255, Math.max(0, b));
  }

  ctx.putImageData(imageData, 0, 0);
};
