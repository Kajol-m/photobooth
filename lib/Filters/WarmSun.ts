// /**
//  * Apply a vintage photo booth filter (1950s look)
//  * @param ctx CanvasRenderingContext2D - The 2D context of the canvas
//  * @param canvas HTMLCanvasElement - The canvas element where the image is drawn
//  * @param intensity number - 0 to 1 (filter strength)
//  */
// export function applyWarmSunFilter(
//   ctx: CanvasRenderingContext2D,
//   canvas: HTMLCanvasElement,
//   intensity: number = 1
// ): void {
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//   const data = imageData.data

//   // Warm tone + contrast + saturation
//   for (let i = 0; i < data.length; i += 4) {
//     const r = data[i]
//     const g = data[i + 1]
//     const b = data[i + 2]

//     const warmR = Math.min(255, r + 20 * intensity)
//     const warmG = Math.min(255, g + 10 * intensity)
//     const warmB = Math.max(0, b - 15 * intensity)

//     const contrast = 1.3 * intensity
//     const contrastR = Math.min(255, Math.max(0, (warmR - 128) * contrast + 128))
//     const contrastG = Math.min(255, Math.max(0, (warmG - 128) * contrast + 128))
//     const contrastB = Math.min(255, Math.max(0, (warmB - 128) * contrast + 128))

//     const gray = (contrastR + contrastG + contrastB) / 3
//     const saturation = 0.85 * intensity
//     const finalR = Math.round(gray + (contrastR - gray) * saturation)
//     const finalG = Math.round(gray + (contrastG - gray) * saturation)
//     const finalB = Math.round(gray + (contrastB - gray) * saturation)

//     data[i] = finalR
//     data[i + 1] = finalG
//     data[i + 2] = finalB
//   }

//   // Add film grain
//   for (let i = 0; i < data.length; i += 4) {
//     const grain = (Math.random() - 0.5) * 10 * intensity
//     data[i] = Math.min(255, Math.max(0, data[i] + grain))
//     data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain))
//     data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain))
//   }

//   ctx.putImageData(imageData, 0, 0)

//   // Add vignette effect
//   const gradient = ctx.createRadialGradient(
//     canvas.width / 2,
//     canvas.height / 2,
//     0,
//     canvas.width / 2,
//     canvas.height / 2,
//     Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
//   )
//   gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
//   gradient.addColorStop(1, `rgba(0, 0, 0, ${0.3 * intensity})`)
//   ctx.fillStyle = gradient
//   ctx.fillRect(0, 0, canvas.width, canvas.height)
// }
/**
 * Apply a vintage photo booth filter (1950s look)
 * @param ctx CanvasRenderingContext2D - The 2D context of the canvas
 * @param canvas HTMLCanvasElement - The canvas element where the image is drawn
 * @param intensity number - 0 to 1 (filter strength)
 * @param brightness number - Brightness multiplier (0.5 = darker, 1 = normal, 1.5 = brighter)
 */
export function applyWarmSunFilter(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1,
  brightness: number = 1.2
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Warm tone + contrast + saturation + brightness
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Apply brightness first
    const brightR = r * brightness
    const brightG = g * brightness
    const brightB = b * brightness

    // Add warm tone
    const warmR = Math.min(255, brightR + 20 * intensity)
    const warmG = Math.min(255, brightG + 10 * intensity)
    const warmB = Math.max(0, brightB - 15 * intensity)

    // Apply contrast
    const contrast = 1.3 * intensity
    const contrastR = Math.min(255, Math.max(0, (warmR - 128) * contrast + 128))
    const contrastG = Math.min(255, Math.max(0, (warmG - 128) * contrast + 128))
    const contrastB = Math.min(255, Math.max(0, (warmB - 128) * contrast + 128))

    // Apply saturation
    const gray = (contrastR + contrastG + contrastB) / 3
    const saturation = 0.85 * intensity
    const finalR = Math.round(gray + (contrastR - gray) * saturation)
    const finalG = Math.round(gray + (contrastG - gray) * saturation)
    const finalB = Math.round(gray + (contrastB - gray) * saturation)

    data[i] = finalR
    data[i + 1] = finalG
    data[i + 2] = finalB
  }

  // Add film grain (subtle)
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 10 * intensity
    data[i] = Math.min(255, Math.max(0, data[i] + grain))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain))
  }

  ctx.putImageData(imageData, 0, 0)

  // Add vignette effect
  const gradient = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
  )
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
  gradient.addColorStop(1, `rgba(0, 0, 0, ${0.3 * intensity})`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// Alternative approach: Brightness as additive adjustment
export function applyWarmSunFilterAdditive(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  intensity: number = 1,
  brightnessBoost: number = 20
): void {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  // Warm tone + contrast + saturation + brightness
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Add warm tone + brightness boost
    const warmR = Math.min(255, r + (20 + brightnessBoost) * intensity)
    const warmG = Math.min(255, g + (10 + brightnessBoost) * intensity)
    const warmB = Math.max(0, b + (-15 + brightnessBoost) * intensity)

    // Apply contrast
    const contrast = 1.3 * intensity
    const contrastR = Math.min(255, Math.max(0, (warmR - 128) * contrast + 128))
    const contrastG = Math.min(255, Math.max(0, (warmG - 128) * contrast + 128))
    const contrastB = Math.min(255, Math.max(0, (warmB - 128) * contrast + 128))

    // Apply saturation
    const gray = (contrastR + contrastG + contrastB) / 3
    const saturation = 0.85 * intensity
    const finalR = Math.round(gray + (contrastR - gray) * saturation)
    const finalG = Math.round(gray + (contrastG - gray) * saturation)
    const finalB = Math.round(gray + (contrastB - gray) * saturation)

    data[i] = finalR
    data[i + 1] = finalG
    data[i + 2] = finalB
  }

  // Add film grain
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 10 * intensity
    data[i] = Math.min(255, Math.max(0, data[i] + grain))
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain))
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain))
  }

  ctx.putImageData(imageData, 0, 0)

  // Add vignette effect
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
}