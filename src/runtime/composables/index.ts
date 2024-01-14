export function useBaseTransition(props?: { duration: number }) {
  const resetProperty = (el: HTMLElement, properties: string[]) => {
    properties.forEach(property => {
      el.style.removeProperty(property)
    })
  }

  const setupTransition = (el: HTMLElement, properties: string[] = []) => {
    const duration = props?.duration ?? 150
    const easing = 'ease-in-out'
    const delay = 0

    const transitionProperties = ['width', 'height', 'padding', 'margin', 'opacity', 'transform'].concat(properties)
    el.style.setProperty('transition-property', transitionProperties.join(','))
    el.style.setProperty('transition-duration', `${duration}ms`, 'important')
    el.style.setProperty('transition-timing-function', `${easing}`, 'important')
    el.style.setProperty('transition-delay', `${delay}ms`, 'important')
  }

  return {
    resetProperty,
    setupTransition
  }
}
