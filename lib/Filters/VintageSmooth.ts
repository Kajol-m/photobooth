/**
 * Apply a smooth vintage filter with minimal grain
 * @param ctx CanvasRenderingContext2D - The 2D context of the canvas
 * @param canvas HTMLCanvasElement - The canvas element where the image is drawn
 * @param intensity number - 0 to 1 (filter strength)
 */
export function applyVintageSmoothFilter(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Process each pixel for vintage look
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Step 1: Apply sepia-like warm vintage tones
    const sepiaR = (r * 0.393 + g * 0.769 + b * 0.189)
    const sepiaG = (r * 0.349 + g * 0.686 + b * 0.168)
    const sepiaB = (r * 0.272 + g * 0.534 + b * 0.131)

    // Step 2: Reduce sepia intensity for softer vintage look
    const vintageR = r + (sepiaR - r) * 0.6 * intensity
    const vintageG = g + (sepiaG - g) * 0.6 * intensity
    const vintageB = b + (sepiaB - b) * 0.6 * intensity

    // Step 3: Fade effect (lift blacks, reduce contrast)
    const fadeFactor = 0.15 * intensity
    const fadeR = vintageR + (255 - vintageR) * fadeFactor
    const fadeG = vintageG + (255 - vintageG) * fadeFactor
    const fadeB = vintageB + (255 - vintageB) * fadeFactor

    // Step 4: Slight warm boost
    const warmR = Math.min(255, fadeR + 10 * intensity)
    const warmG = fadeG
    const warmB = Math.max(0, fadeB - 5 * intensity)

    // Step 5: Soft contrast adjustment
    const softContrast = 1.15 * intensity
    const contrastR = Math.min(255, Math.max(0, (warmR - 128) * softContrast + 128))
    const contrastG = Math.min(255, Math.max(0, (warmG - 128) * softContrast + 128))
    const contrastB = Math.min(255, Math.max(0, (warmB - 128) * softContrast + 128))

    // Step 6: Desaturate slightly for vintage feel
    const gray = (contrastR * 0.299 + contrastG * 0.587 + contrastB * 0.114)
    const desaturation = 0.75 * intensity
    const finalR = Math.round(gray + (contrastR - gray) * desaturation)
    const finalG = Math.round(gray + (contrastG - gray) * desaturation)
    const finalB = Math.round(gray + (contrastB - gray) * desaturation)

    data[i] = finalR
    data[i + 1] = finalG
    data[i + 2] = finalB
  }

  // Very minimal grain (optional, almost imperceptible)
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 2 * intensity
    data[i] = Math.min(255, Math.max(0, data[i] + grain))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain))
  }

  ctx.putImageData(imageData, 0, 0)

  // Subtle vignette
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
  )
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  gradient.addColorStop(1, `rgba(0, 0, 0, ${0.2 * intensity})`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Subtle warm overlay for dreamy vintage effect
  ctx.globalCompositeOperation = 'soft-light'
  ctx.fillStyle = `rgba(255, 245, 230, ${0.12 * intensity})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'source-over'
}