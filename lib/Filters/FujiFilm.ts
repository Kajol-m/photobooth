// @/lib/Filters/FujiFilm.ts

/**
 * Applies a Fujifilm-inspired look with prominent grain.
 * Characteristics: High contrast, slightly lifted blacks, vibrant colors, greenish shadows, and heavy grain.
 */
export const applyFujiFilmFilter = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    intensity: number = 1
  ) => {
    const width = canvas.width;
    const height = canvas.height;
    // Get all pixel data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
  
    // Contrast adjustment factor
    const contrast = 30 * intensity; // Adjustable contrast strength
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  
    // Grain strength
    const grainStrength = 45 * intensity;
  
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
  
      // --- 1. Color & Contrast Grading ---
  
      // Apply Contrast Curve
      r = factor * (r - 128) + 128;
      g = factor * (g - 128) + 128;
      b = factor * (b - 128) + 128;
  
      // Lift blacks slightly (film blacks are rarely pure #000)
      r += 15 * intensity;
      g += 15 * intensity;
      b += 20 * intensity; // Lift blues a tiny bit more in shadows for that cool film look
  
      // Fuji Color Shift Characteristics:
      // Boost reds slightly for vibrancy
      r = r * (1 + 0.05 * intensity);
      // Push greens slightly into mids/shadows
      g = g * (1 + 0.02 * intensity);
      // Pull blues slightly down in highlights for warmth
      b = b * (1 - 0.04 * intensity);
  
  
      // --- 2. Add Film Grain ---
  
      // Generate monochromatic noise.
      // We use Math.random() to get a value between -0.5 and 0.5, scaled by strength.
      // It must be added equally to R, G, and B to ensure it's black & white grain, not colored noise.
      const noise = (Math.random() - 0.5) * grainStrength;
  
      r += noise;
      g += noise;
      b += noise;
  
      // --- 3. Clamping ---
      // Ensure values stay within valid RGB range (0-255) after all math
      data[i] = Math.min(255, Math.max(0, r));     // Red
      data[i + 1] = Math.min(255, Math.max(0, g)); // Green
      data[i + 2] = Math.min(255, Math.max(0, b)); // Blue
      // data[i+3] is alpha, leave it alone
    }
  
    // Put the modified pixels back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  };