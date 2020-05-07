declare module '@richardcrng/swing' {
  interface SwingConfig {
    throwOutConfidence?: (xOffset: number, yOffset: number, element: HTMLElement) => number

    minThrowOutDistance?: number
    maxThrowOutDistance?: number

    allowMovement?(object: SwingEvent, touch: boolean): boolean

    transform?(targetElement: HTMLElement, coordinateX: number, coordinateY: number, rotation: number): void
  }

  type SwingEventType = 'throwout'
    | 'throwoutend'
    | 'throwoutdown'
    | 'throwoutleft'
    | 'throwoutright'
    | 'throwoughtup'
    | 'throwin'
    | 'throwinend'
    | 'dragstart'
    | 'dragmove'
    | 'dragend'
    | 'destroyCard'

  interface SwingEvent {
    target: HTMLElement,
    direction: Symbol,
    throwOutConfidence: number
  }

  interface Stack {
    createCard(element: HTMLElement, prepend?: boolean): void


  }

  interface Card {
    on(event: SwingEventType, listener: (eventObject: SwingEvent) => void)

    throwIn(coordinateX: number, coordinateY: number): void
    throwOut(coordinateX: number, coordinateY: number): void

    destroy(): void
  }

  export function Stack(config?: SwingConfig): Stack
}