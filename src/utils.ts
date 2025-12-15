export function projectHeight(h: number, angle: number = 45): number {
  const rad = (angle * Math.PI) / 180;
  return h * Math.cos(rad);
}

export function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null)
    }, ms)
  })
}


