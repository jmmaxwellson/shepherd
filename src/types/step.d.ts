import Tour from './tour';
import Evented from './evented';

declare namespace Step {
  /**
   * The options for the step
   */
  interface StepOptions {
    /**
     * What element the step should be attached to on the page.
     * It can either be a string of the form "element on", or an object with those properties.
     * For example: ".some #element left", or {element: '.some #element', on: 'left'}.
     * If you use the object syntax, element can also be a DOM element. If you don’t specify an attachTo the
     * element will appear in the middle of the screen.
     */
    attachTo?: StepOptionsAttachTo | string;

    /**
     * An action on the page which should advance shepherd to the next step.
     * It can be of the form `"selector event"`, or an object with those properties.
     * For example: `".some-element click"`, or `{selector: '.some-element', event: 'click'}`.
     * It doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
     * You can also always manually advance the Tour by calling `myTour.next()`
     */
    advanceOn?: StepOptionsAdvanceOn | string;

    /**
     * A function that returns a promise.
     * When the promise resolves, the rest of the `show` code for the step will execute.
     */
    beforeShowPromise?: (() => Promise<any>);

    /**
     * An array of buttons to add to the step. These will be rendered in a
     * footer below the main body text.
     */
    buttons?: ReadonlyArray<StepOptionsButton>;

    /**
     * A string of extra classes to add to the step's content element.
     */
    classes?: string;

    /**
     * An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     */
    highlightClass?: string;

    /**
     * Extra [options to pass to tippy.js]{@link https://atomiks.github.io/tippyjs/#all-options}
     */
    tippyOptions?: object;

    /**
     * Should the element be scrolled to when this step is shown?
     */
    scrollTo?: boolean;

    /**
     * A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
     */
    scrollToHandler?: ((element: HTMLElement) => void);

    /**
     * Should a cancel “✕” be shown in the header of the step?
     */
    showCancelLink?: boolean;

    /**
     * A function that, when it returns `true`, will show the step.
     * If it returns `false`, the step will be skipped.
     */
    showOn?: (() => boolean);

    /**
     * The text in the body of the step. It can be one of four types:
     * ```
     * - HTML string
     * - Array of HTML strings
     * - `HTMLElement` object
     * - `Function` to be executed when the step is built. It must return one of the three options above.
     * ```
     */
    text?: string | ReadonlyArray<string> | HTMLElement | (() => string | ReadonlyArray<string> | HTMLElement)

    /**
     * The step's title. It becomes an `h3` at the top of the step.
     */
    title?: string;

    /**
     * You can define `show`, `hide`, etc events inside `when`. For example:
     * ```js
     * when: {
     *   show: function() {
     *     window.scrollTo(0, 0);
     *   }
     * }
     * ```
     */
    when?: StepOptionsWhen;
  }

  interface StepOptionsAttachTo {
    element?: HTMLElement | string;

    on?: string;
  }

  interface StepOptionsAdvanceOn {
    selector?: string;
    event?: string;
  }

  interface StepOptionsButton {
    /**
     * A function executed when the button is clicked on
     */
    action?: (() => void);

    /**
     * Extra classes to apply to the `<a>`
     */
    classes?: string;

    /**
     * A hash of events to bind onto the button, for example
     * `{'mouseover': function(){}}`. Adding a `click` event to events when you already have an `action` specified is not supported.
     * You can use events to skip steps or navigate to specific steps, with something like:
     * ```js
     * events: {
     *   click: function() {
     *     return Shepherd.activeTour.show('some_step_name');
     *   }
     * }
     * ```
     */
    events?: StepOptoonsButtonEvent;

    /**
     * The HTML text of the button
     */
    text?: string;
  }

  interface StepOptoonsButtonEvent {
    [key: string]: (() => void);
  }

  interface StepOptionsWhen {
    [key: string]: (() => void);
  }
}

/**
 * Class representing steps to be added to a tour
 * @extends {Evented}
 */
declare class Step extends Evented {
  /**
   * Create a step
   * @param tour The tour for the step
   * @param options The options for the step
   * @return The newly created Step instance
   */
  constructor(tour: Tour, options: Step.StepOptions);//TODO superheri Note: Return on constructor is not possible in typescript. Could this be possible to make this the same for the constructor of the Step class?

  /**
   * Returns the tour for the step
   * @return The tour instance
   */
  getTour(): Tour;

  /**
   * Cancel the tour
   * Triggers the `cancel` event
   */
  cancel(): void;

  /**
   * Complete the tour
   * Triggers the `complete` event
   */
  complete(): void;

  /**
   * Remove the step, delete the step's element, and destroy the tippy instance for the step
   * Triggers `destroy` event
   */
  destroy(): void;

  /**
   * Hide the step and destroy the tippy instance
   */
  hide(): void;

  /**
   * Check if the step is open and visible
   * @return True if the step is open and visible
   */
  isOpen(): boolean;

  /**
   * Create the element and set up the tippy instance
   */
  setupElements(): void;

  /**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   */
  scrollTo(): void;

  /**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param options The options for the step default is `{}`
   */
  setOptions(options?: Step.StepOptions): void;

  /**
   * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
   * @return Promise
   */
  show(): Promise<void> | void;
}

export default Step;
