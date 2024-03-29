/**
 * Melba - lightweight, accessible, VanillaJS toast library.
 */
import EventEmitter from '@dom111/typed-event-emitter/EventEmitter';
declare type MelbaEventMap = {
    build: [];
    hide: [];
    remove: [];
    show: [];
};
declare type MelbaEventHandler<K extends keyof MelbaEventMap> = (...args: MelbaEventMap[K]) => void;
declare type MelbaEventContainer = {
    [K in keyof MelbaEventMap]?: MelbaEventHandler<K>[];
};
declare type MelbaConstructorOptions = MelbaOptions & {
    container?: HTMLElement | null;
    events?: MelbaEventContainer;
    type?: MelbaType;
};
declare type MelbaType = 'error' | 'info' | 'success' | 'warning';
export declare type MelbaOptions = {
    animation?: boolean;
    animationDuration?: number;
    autoShow?: boolean;
    containerClass?: string;
    containerElement?: string;
    closeLabel?: string;
    hide?: boolean | number;
    hideDelay?: number;
    root?: HTMLElement | null;
    toastClass?: string;
    toastElement?: string;
    toastHideClass?: string;
    toastShowClass?: string;
    type?: MelbaType;
};
export declare class Melba extends EventEmitter<MelbaEventMap> {
    /**
     * #defaults
     *
     * The library's default parameters:
     *
     * - `animation` - Whether or not the element is animated with CSS.
     * - `animationDuration` - The duration of the CSS animation.
     * - `autoShow` - If the toast should be automatically shown when instantiated. Defaults to `true`.
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
     * - `type` - The type of the toast, this will be added as a `className` like `toast--${type}`.
     *
     * @type {MelbaOptions}
     */
    private static defaults;
    private animation;
    private autoShow;
    private container;
    private element;
    private events;
    private hasFocus;
    private hideDelay;
    private toastHideClass;
    private toastShowClass;
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
     * @param toastHideClass {string} Optional. Used to override the `defaults`.
     * @param toastShowClass {string} Optional. Used to override the `defaults`.
     * @param type {string} Optional. Used to override the `defaults`.
     */
    constructor(content: string, { animation, animationDuration, closeLabel, container, containerClass, containerElement, events, hide, root, toastClass, toastElement, toastHideClass, toastShowClass, type, }: MelbaConstructorOptions);
    private autoHide;
    private build;
    show(): void;
    hide(force?: boolean): void;
    remove(): void;
    buildClose(closeLabel: any): HTMLButtonElement;
    getContainer({ containerClass, containerElement, root, }: {
        containerClass: string;
        containerElement: string;
        root: HTMLElement;
    }): HTMLElement;
    getElement(): HTMLElement;
    /**
     * Used to override the default settings for all instances.
     *
     * @param settings {MelbaOptions} See `defaults` for details.
     */
    static settings(settings: MelbaOptions): void;
}
export declare const toast: (content: string, options?: MelbaOptions) => Melba;
export declare const error: (content: string, options?: MelbaOptions) => Melba;
export declare const info: (content: string, options?: MelbaOptions) => Melba;
export declare const success: (content: string, options?: MelbaOptions) => Melba;
export declare const warning: (content: string, options?: MelbaOptions) => Melba;
export default Melba;
