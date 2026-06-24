/**
 * Decide whether black or white text has better contrast against a given HSL color.
 * @param hsl - string in "h, s%, l%" format (without hsl())
 * @returns "hsl(0, 0%, 0%)" (black) or "hsl(0, 0%, 100%)" (white)
 */
export function pickTextColor(hsl: string): string {
  // Extract numbers
  const parts = hsl.match(/[\d.]+%?/g)
  if (!parts || parts.length < 3) {
    throw new Error(`Invalid HSL format: ${hsl}`)
  }

  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1]!.replace('%', '')) / 100
  const l = parseFloat(parts[2]!.replace('%', '')) / 100

  // Convert HSL → RGB
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0,
    g = 0,
    b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  r += m
  g += m
  b += m

  // Relative luminance
  const linearize = (c: number): number =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const L = 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)

  // Contrast ratios
  const contrastWithBlack = (L + 0.05) / 0.05
  const contrastWithWhite = 1.05 / (L + 0.05)

  // Pick whichever has higher contrast
  return contrastWithWhite >= contrastWithBlack ? '0, 0%, 100%' : '0, 0%, 0%'
}
