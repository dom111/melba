/**
 * Melba - lightweight, accessible, VanillaJS toast library.
 */

type MatchesFunction =
  | 'matches'
  | 'msMatchesSelector'
  | 'webkitMatchesSelector';

// IE11 support
const [matchesFunction] = ((): MatchesFunction[] => {
    const element = document.createElement('a');

    return (
      [
        'matches',
        'msMatchesSelector',
        'webkitMatchesSelector',
      ] as MatchesFunction[]
    ).filter((property: MatchesFunction): boolean => property in element);
  })(),
  focusedSelector = ((): string => {
    const element = document.createElement('a');

    try {
      element[matchesFunction](':focus-within');

      return ':focus-within, :focus, :hover';
    } catch (e) {
      return ':focus, :hover';
    }
  })();
export type MelbaOptions = {
  animation?: boolean;
  animationDuration?: number;
  containerClass?: string;
  containerElement?: string;
  closeLabel?: string;
  hide?: boolean | number;
  hideDelay?: number;
  root?: HTMLElement | null;
  toastClass?: string;
  toastElement?: string;
  toastEvents?: MelbaDOMEvent[];
  toastHideClass?: string;
  toastShowClass?: string;
  toastType?: MelbaType;
};

export type MelbaDOMEvent = 'click' | 'focus' | 'keydown';
export type MelbaEvent = MelbaDOMEvent | 'build' | 'hide' | 'remove' | 'show';

export type MelbaEventContainer = { [K in MelbaEvent]?: MelbaEventHandler[] };

export type MelbaConstructorOptions = MelbaOptions & {
  container?: HTMLElement | null;
  content: string;
  events?: MelbaEventContainer;
  type?: MelbaType;
};

export type MelbaType = 'info' | 'error' | 'warning' | 'success';

export type MelbaEventHandler = (
  toast: Melba,
  element: HTMLElement,
  ...args: any[]
) => void;

export class Melba {
  /**
   * #defaults
   *
   * The library's default parameters:
   *
   * - `animation` - Whether or not the element is animated with CSS.
   * - `animationDuration` - The duration of the CSS animation.
   * - `containerClass` - The `className` applied to the container element.
   * - `containerElement` - The element type used for the container.
   * - `closeLabel` - The text label for the close button.
   * - `hide` - Controls auto-hide behaviour. `false` disables by default, a number controls the time before auto-hiding
   *     and `true` will auto-hide after a delay of `hideDelay`.
   * - `hideDelay` - The default auto-hide delay.
   * - `root` - The root element to attach the `containerElement` to.
   * - `toastClass` - The `className` to apply to all toasts.
   * - `toastElement` - The element type used for toasts.
   * - `toastEvents` - The DOM events to expose for toasts.
   * - `toastHideClass` - The `className` applied to the toast to hide.
   * - `toastShowClass` - The `className` applied to the toast to show.
   * - `toastType` - The type of the toast, this will be added as a `className` like `toast--${type}`.
   *
   * @type {MelbaOptions}
   */
  private static defaults: MelbaOptions = {
    animation: true,
    animationDuration: 400,
    closeLabel: 'Close', // TODO: i18n
    containerClass: 'toast__container',
    containerElement: 'div',
    hide: false,
    hideDelay: 5,
    root: document.body,
    toastClass: 'toast',
    toastElement: 'div',
    toastEvents: ['click', 'focus', 'keydown'],
    toastHideClass: 'toast--hide',
    toastShowClass: 'toast--show',
    toastType: 'info',
  };

  private animation: boolean;
  private container: HTMLElement;
  private element: HTMLElement;
  private events: MelbaEventContainer;
  private hasFocus: boolean;
  private hideDelay: false | number;
  private toastHideClass: string;
  private toastShowClass: string;

  /**
   * @param animation {boolean} Optional. Used to override the `defaults`.
   * @param animationDuration {number} Optional. Used to override the `defaults`.
   * @param closeLabel {string} Optional. Used to override the `defaults`.
   * @param container {?HTMLElement} Optional. Specify the container element.
   * @param containerClass {string} Optional. Used to override the `defaults`.
   * @param containerElement {string} Optional. Used to override the `defaults`.
   * @param content {string} Required. The content to show in the toast.
   * @param events {MelbaEventContainer}. An object that contains event reference keys (see calls to `events()`) which
   *   contain arrays of callables.
   * @param hide {boolean | number} Optional. Used to override the `defaults`.
   * @param root {HTMLElement} Optional. Used to override the `defaults`.
   * @param toastClass {string} Optional. Used to override the `defaults`.
   * @param toastElement {string} Optional. Used to override the `defaults`.
   * @param toastEvents {MelbaDOMEvent[]} Optional. Used to override the `defaults`.
   * @param toastHideClass {string} Optional. Used to override the `defaults`.
   * @param toastShowClass {string} Optional. Used to override the `defaults`.
   * @param type {string} Optional. Used to override the `defaults`.
   */
  constructor({
    animation = Melba.defaults.animation,
    animationDuration = Melba.defaults.animationDuration,
    closeLabel = Melba.defaults.closeLabel,
    container = null,
    containerClass = Melba.defaults.containerClass,
    containerElement = Melba.defaults.containerElement,
    content,
    events = {},
    hide = Melba.defaults.hide,
    root = Melba.defaults.root,
    toastClass = Melba.defaults.toastClass,
    toastElement = Melba.defaults.toastElement,
    toastEvents = [...Melba.defaults.toastEvents],
    toastHideClass = Melba.defaults.toastHideClass,
    toastShowClass = Melba.defaults.toastShowClass,
    type = Melba.defaults.toastType,
  }: MelbaConstructorOptions) {
    if (!content) {
      throw new TypeError("'content' cannot be empty.");
    }

    this.animation = animation;
    this.events = events;
    this.toastHideClass = toastHideClass;
    this.toastShowClass = toastShowClass;

    if (!container) {
      container = this.getContainer({ containerClass, containerElement, root });
    }

    this.container = container;

    if (hide === true) {
      hide = Melba.defaults.hideDelay;
    }

    // ensure we store milliseconds
    if (hide !== false && hide < 100) {
      hide *= 1000;
    }

    this.hideDelay = hide;

    if (animationDuration < 100) {
      animationDuration *= 1000;
    }

    this.build({
      closeLabel,
      content,
      toastClass,
      toastElement,
      toastEvents,
      type,
    });

    if (this.hideDelay !== false) {
      this.autohide({ animationDuration });
    }

    if (this.animation) {
      window.requestAnimationFrame(() => this.show());

      return;
    }

    this.show();
  }

  private autohide({
    animationDuration,
  }: {
    animationDuration: number;
  }): number {
    if (!this.hideDelay) {
      return;
    }

    return window.setTimeout(
      () => this.hide(),
      this.hideDelay + (this.animation ? animationDuration : 0)
    );
  }

  private build({
    closeLabel,
    content,
    toastClass,
    toastElement,
    toastEvents,
    type,
  }: {
    closeLabel: string;
    content: string;
    toastClass: string;
    toastElement: string;
    toastEvents: MelbaDOMEvent[];
    type: string;
  }): void {
    this.element = document.createElement(toastElement);

    this.element.setAttribute('title', content);
    this.element.setAttribute('role', 'status'); // for screen readers
    this.element.setAttribute('tabindex', '0'); // make the toast navigable via keyboard
    this.element.classList.add(toastClass);
    this.element.classList.add(`toast--${type}`);
    this.element.appendChild(this.buildClose(closeLabel));
    this.element.appendChild(document.createTextNode(content));

    this.element.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        this.hide();
      }
    });

    toastEvents.forEach((eventName) => {
      this.element.addEventListener(eventName, (event) => {
        this.trigger(eventName, event);
      });
    });

    this.container.appendChild(this.element);

    this.trigger('build');
  }

  show(): void {
    this.element.classList.remove(this.toastHideClass);
    this.element.classList.add(this.toastShowClass);

    this.trigger('show');
  }

  hide(force: boolean = false): void {
    if (!force && this.hasFocus) {
      return;
    }

    // polyfill .matches in IE11
    if (!force && this.element[matchesFunction](focusedSelector)) {
      this.element.addEventListener('mouseout', () => {
        this.hasFocus = false;

        if (this.hideDelay > 0) {
          this.hide();
        }
      });
    }

    this.element.classList.remove(this.toastShowClass);
    this.element.classList.add(this.toastHideClass);

    this.trigger('hide');

    // if we're animating there's a chance that the toast could be focused whilst it's disappearing. This prevents a
    // `:hover`ed or `:focus`ed toast from being hidden and removed.
    if (this.animation) {
      const transitionEndHandler = () => this.remove(),
        transitionStartHandler = () => {
          if (bound) {
            return;
          }

          this.element.addEventListener('transitionend', () =>
            transitionEndHandler()
          );

          bound = true;
        },
        mouseOverHandler = () => {
          this.show();

          this.element.removeEventListener('transitionstart', () =>
            transitionStartHandler()
          );
          this.element.removeEventListener('transitionend', () =>
            transitionEndHandler()
          );
          this.element.removeEventListener('mouseover', () =>
            mouseOverHandler()
          );
          this.element.addEventListener('mouseout', () => this.hide());
        };

      let bound = false;

      this.element.addEventListener('mouseover', () => mouseOverHandler());
      this.element.addEventListener('transitionstart', () =>
        transitionStartHandler()
      );

      return;
    }

    this.remove();
  }

  remove(): void {
    // Safety as `remove` can end up being called multiple times
    if (this.element.parentNode === this.container) {
      this.container.removeChild(this.element);

      this.trigger('remove');
    }
  }

  buildClose(closeLabel): HTMLButtonElement {
    const closeButton = document.createElement('button');

    closeButton.setAttribute('title', closeLabel);
    closeButton.appendChild(document.createTextNode(closeLabel));
    closeButton.addEventListener('click', () => this.hide());

    return closeButton;
  }

  getContainer({
    containerClass,
    containerElement,
    root,
  }: {
    containerClass: string;
    containerElement: string;
    root: HTMLElement;
  }): HTMLElement {
    const existingContainer = root.querySelector(
      `${containerElement}.${containerClass}`
    );

    if (existingContainer) {
      return existingContainer as HTMLElement;
    }

    const container = document.createElement(containerElement);

    container.classList.add(containerClass);
    root.appendChild(container);

    return container;
  }

  on(event: MelbaEvent, callable: MelbaEventHandler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callable);
  }

  off(event: MelbaEvent, callable: MelbaEventHandler | null = null): void {
    if (!callable) {
      this.events[event] = [];

      return;
    }

    const hasEvent = this.events[event].indexOf(callable);

    if (hasEvent === -1) {
      this.events[event].splice(hasEvent, 1);
    }
  }

  trigger(event: MelbaEvent, ...args: any[]) {
    (this.events[event] || []).forEach((callable: MelbaEventHandler): void =>
      callable(this, this.element, ...args)
    );
  }

  /**
   * Used to override the default settings for all instances.
   *
   * @param settings {MelbaOptions} See `defaults` for details.
   */
  static settings(settings: MelbaOptions): void {
    Melba.defaults = {
      ...Melba.defaults,
      ...settings,
    };
  }
}

export default Melba;
