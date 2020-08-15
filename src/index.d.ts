declare module 'swing' {
  interface StackConfig {
    throwOutConfidence?: (xOffset: number, yOffset: number, element: HTMLElement) => number

    allowedDirections?: Direction[]

    minThrowOutDistance?: number
    maxThrowOutDistance?: number

    allowMovement?(object: SwingEvent, touch: boolean): boolean

    transform?(targetElement: HTMLElement, coordinateX: number, coordinateY: number, rotation: number): void

    maxRotation?: number
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
    throwDirection: Direction,
    throwOutConfidence: number
  }

  interface Listener {
    name: string,
    handler: VoidFunction
  }

  interface Sister {
    on(name: string, handler: VoidFunction): Listener,
    off(listener: Listener): void
    trigger(name: string, object: Object): void
  }

  export interface Stack {
    /**
     * Creates an instance of Card and associates it with an element.
     * @param element
     * @param prepend
     */
    createCard(element: HTMLElement, prepend?: boolean): Card

    /**
     * Returns an instance of Card associated with an element.
     * @param element
     */
    getCard(element: HTMLElement): Card | null

    getSpringSystem(): Sister

    /**
     * Proxy to the instance of the event emitter.
     * @param eventName 
     * @param listener 
     */
    on(eventName: SwingEventType, listener: object): Listener
  }

  export interface Card {
    on(event: SwingEventType, listener: (eventObject: SwingEvent) => void)

    throwIn(coordinateX: number, coordinateY: number): void
    throwOut(coordinateX: number, coordinateY: number): void

    destroy(): void
  }

  export enum Direction {
    DOWN = Symbol('DOWN'),
    UP = Symbol('UP'),
    INVALID = Symbol('INVALID'),
    LEFT = Symbol('LEFT'),
    RIGHT = Symbol('RIGHT')
  }

  export function Stack(config?: StackConfig): Stack
}