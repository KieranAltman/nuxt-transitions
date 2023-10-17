type MatrixType = 'matrix3d' | 'matrix'

export const getMatrix = (transform: string) => {
  const matrixType: MatrixType = transform.startsWith('matrix3d') ? 'matrix3d' : 'matrix'
  const matrix =
    matrixType === 'matrix3d'
      ? transform.slice(9, -1).split(',').map(Number)
      : transform.startsWith('matrix')
      ? transform.slice(7, -1).split(',').map(Number)
      : [1, 0, 0, 1, 0, 0]

  return { matrixType, matrix }
}

export const clamp = (min: number, val: number, max: number) => {
  return Math.max(min, Math.min(max, val))
}
