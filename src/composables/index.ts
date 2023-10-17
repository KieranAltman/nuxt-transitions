export function useBaseTransition() {
  const resetProperty = (el: HTMLElement, properties: string[]) => {
    properties.forEach(property => {
      el.style.removeProperty(property)
    })
  }

  const setupTransition = (el: HTMLElement) => {
    const duration = 150
    const easing = 'ease-in-out'
    const delay = 0

    el.style.setProperty('transition-property', 'opacity, transform')
    el.style.setProperty('transition-duration', `${duration}ms`, 'important')
    el.style.setProperty('transition-timing-function', `${easing}`, 'important')
    el.style.setProperty('transition-delay', `${delay}ms`, 'important')
  }

  return {
    resetProperty,
    setupTransition
  }
}
