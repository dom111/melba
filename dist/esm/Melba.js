import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _classPrivateFieldGet from "@babel/runtime/helpers/classPrivateFieldGet";
import _classPrivateFieldSet from "@babel/runtime/helpers/classPrivateFieldSet";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

/**
 * Melba - lightweight, accessible, VanillaJS toast library.
 */
// IE11 support
var _ref = function () {
  var element = document.createElement('a');
  return ['matches', 'msMatchesSelector', 'webkitMatchesSelector'].filter(function (property) {
    return property in element;
  });
}(),
    _ref2 = _slicedToArray(_ref, 1),
    matchesFunction = _ref2[0],
    focusedSelector = function () {
  var element = document.createElement('a');

  try {
    element[matchesFunction](':focus-within');
    return ':focus-within, :focus, :hover';
  } catch (e) {
    return ':focus, :hover';
  }
}();

var Melba =
/*#__PURE__*/
function () {
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
   *   and `true` will auto-hide after a delay of `hideDelay`.
   * - `hideDelay` - The default auto-hide delay.
   * - `root` - The root element to attach the `containerElement` to.
   * - `toastClass` - The `className` to apply to all toasts.
   * - `toastElement` - The element type used for toasts.
   * - `toastEvents` - The DOM events to expose for toasts.
   * - `toastHideClass` - The `className` applied to the toast to hide.
   * - `toastShowClass` - The `className` applied to the toast to show.
   * - `toastType` - The type of the toast, this will be added as a `className` like `toast--${type}`.
   *
   * @type {{
   *   animation: boolean,
   *   animationDuration: number,
   *   containerClass: string,
   *   containerElement: string,
   *   closeLabel: string,
   *   hide: boolean|number,
   *   hideDelay: number,
   *   root: Element,
   *   toastClass: string,
   *   toastElement: string,
   *   toastEvents: array,
   *   toastHideClass: string,
   *   toastShowClass: string,
   *   toastTy[e]: string
   * }}
   */

  /**
   * @param animation boolean Optional. Used to override the `#defaults`.
   * @param animationDuration number Optional. Used to override the `#defaults`.
   * @param closeLabel string Optional. Used to override the `#defaults`.
   * @param container ?Element Optional. Specify the container element.
   * @param containerClass string Optional. Used to override the `#defaults`.
   * @param containerElement string Optional. Used to override the `#defaults`.
   * @param content string Required. The content to show in the toast.
   * @param events Object Optional. An object that contains event reference keys (see calls to `events()`) which contain
   *   arrays of callables.
   * @param hide boolean|number Optional. Used to override the `#defaults`.
   * @param root Element Optional. Used to override the `#defaults`.
   * @param toastClass string Optional. Used to override the `#defaults`.
   * @param toastElement string Optional. Used to override the `#defaults`.
   * @param toastEvents array Optional. Used to override the `#defaults`.
   * @param toastHideClass string Optional. Used to override the `#defaults`.
   * @param toastShowClass string Optional. Used to override the `#defaults`.
   * @param type string Optional. Used to override the `#defaults`.
   */
  function Melba(_ref3) {
    var _this = this;

    var _ref3$animation = _ref3.animation,
        animation = _ref3$animation === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).animation : _ref3$animation,
        _ref3$animationDurati = _ref3.animationDuration,
        animationDuration = _ref3$animationDurati === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).animationDuration : _ref3$animationDurati,
        _ref3$closeLabel = _ref3.closeLabel,
        closeLabel = _ref3$closeLabel === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).closeLabel : _ref3$closeLabel,
        _ref3$container = _ref3.container,
        container = _ref3$container === void 0 ? null : _ref3$container,
        _ref3$containerClass = _ref3.containerClass,
        containerClass = _ref3$containerClass === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).containerClass : _ref3$containerClass,
        _ref3$containerElemen = _ref3.containerElement,
        containerElement = _ref3$containerElemen === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).containerElement : _ref3$containerElemen,
        content = _ref3.content,
        _ref3$events = _ref3.events,
        events = _ref3$events === void 0 ? {} : _ref3$events,
        _ref3$hide = _ref3.hide,
        hide = _ref3$hide === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).hide : _ref3$hide,
        _ref3$root = _ref3.root,
        root = _ref3$root === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).root : _ref3$root,
        _ref3$toastClass = _ref3.toastClass,
        toastClass = _ref3$toastClass === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastClass : _ref3$toastClass,
        _ref3$toastElement = _ref3.toastElement,
        toastElement = _ref3$toastElement === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastElement : _ref3$toastElement,
        _ref3$toastEvents = _ref3.toastEvents,
        toastEvents = _ref3$toastEvents === void 0 ? _toConsumableArray(_classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastEvents) : _ref3$toastEvents,
        _ref3$toastHideClass = _ref3.toastHideClass,
        toastHideClass = _ref3$toastHideClass === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastHideClass : _ref3$toastHideClass,
        _ref3$toastShowClass = _ref3.toastShowClass,
        toastShowClass = _ref3$toastShowClass === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastShowClass : _ref3$toastShowClass,
        _ref3$type = _ref3.type,
        type = _ref3$type === void 0 ? _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).toastType : _ref3$type;

    _classCallCheck(this, Melba);

    _animation.set(this, {
      writable: true,
      value: void 0
    });

    _container.set(this, {
      writable: true,
      value: void 0
    });

    _element.set(this, {
      writable: true,
      value: void 0
    });

    _events.set(this, {
      writable: true,
      value: void 0
    });

    _hasFocus.set(this, {
      writable: true,
      value: void 0
    });

    _hide.set(this, {
      writable: true,
      value: void 0
    });

    _toastHideClass.set(this, {
      writable: true,
      value: void 0
    });

    _toastShowClass.set(this, {
      writable: true,
      value: void 0
    });

    if (!content) {
      throw new TypeError('\'content\' cannot be empty.');
    }

    _classPrivateFieldSet(this, _animation, animation);

    _classPrivateFieldSet(this, _events, events);

    _classPrivateFieldSet(this, _toastHideClass, toastHideClass);

    _classPrivateFieldSet(this, _toastShowClass, toastShowClass);

    if (!container) {
      container = this.getContainer({
        containerClass: containerClass,
        containerElement: containerElement,
        root: root
      });
    }

    _classPrivateFieldSet(this, _container, container);

    if (hide === true) {
      hide = _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults).hideDelay;
    } // ensure we store microseconds


    if (hide !== false && hide < 100) {
      hide *= 1000;
    }

    _classPrivateFieldSet(this, _hide, hide);

    if (animationDuration < 100) {
      animationDuration *= 1000;
    }

    this.build({
      closeLabel: closeLabel,
      content: content,
      toastClass: toastClass,
      toastElement: toastElement,
      toastEvents: toastEvents,
      type: type
    });

    if (_classPrivateFieldGet(this, _hide) !== false) {
      this.autohide({
        animationDuration: animationDuration
      });
    }

    if (_classPrivateFieldGet(this, _animation)) {
      window.requestAnimationFrame(function () {
        return _this.show();
      });
      return;
    }

    this.show();
  }

  _createClass(Melba, [{
    key: "autohide",
    value: function autohide(_ref4) {
      var _this2 = this;

      var animationDuration = _ref4.animationDuration;
      window.setTimeout(function () {
        _classPrivateFieldSet(_this2, _hide, true);

        _this2.hide();
      }, _classPrivateFieldGet(this, _hide) + (_classPrivateFieldGet(this, _animation) ? animationDuration : 0));
    }
  }, {
    key: "build",
    value: function build(_ref5) {
      var _this3 = this;

      var closeLabel = _ref5.closeLabel,
          content = _ref5.content,
          toastClass = _ref5.toastClass,
          toastElement = _ref5.toastElement,
          toastEvents = _ref5.toastEvents,
          type = _ref5.type;

      _classPrivateFieldSet(this, _element, document.createElement(toastElement));

      _classPrivateFieldGet(this, _element).setAttribute('title', content);

      _classPrivateFieldGet(this, _element).setAttribute('role', 'status'); // for screen readers


      _classPrivateFieldGet(this, _element).setAttribute('tabindex', '0'); // make the toast navigable via keyboard


      _classPrivateFieldGet(this, _element).classList.add(toastClass);

      _classPrivateFieldGet(this, _element).classList.add("toast--".concat(type));

      _classPrivateFieldGet(this, _element).appendChild(this.buildClose(closeLabel));

      _classPrivateFieldGet(this, _element).appendChild(document.createTextNode(content));

      _classPrivateFieldGet(this, _element).addEventListener('keydown', function (event) {
        if (event.which === 27) {
          // if (event.key === 'Escape') {
          event.preventDefault();

          _this3.hide();
        }
      });

      toastEvents.forEach(function (eventName) {
        _classPrivateFieldGet(_this3, _element).addEventListener(eventName, function (event) {
          _this3.trigger(eventName, event);
        });
      });

      _classPrivateFieldGet(this, _container).appendChild(_classPrivateFieldGet(this, _element));

      this.trigger('build');
    }
  }, {
    key: "show",
    value: function show() {
      _classPrivateFieldGet(this, _element).classList.remove(_classPrivateFieldGet(this, _toastHideClass));

      _classPrivateFieldGet(this, _element).classList.add(_classPrivateFieldGet(this, _toastShowClass));

      this.trigger('show');
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this4 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!force && _classPrivateFieldGet(this, _hasFocus)) {
        return;
      } // polyfill .matches in IE11


      if (!force && _classPrivateFieldGet(this, _element)[matchesFunction](focusedSelector)) {
        _classPrivateFieldGet(this, _element).addEventListener('mouseout', function () {
          _classPrivateFieldSet(_this4, _hasFocus, false);

          if (_classPrivateFieldGet(_this4, _hide) === true) {
            _this4.hide();
          }
        });
      }

      _classPrivateFieldGet(this, _element).classList.remove(_classPrivateFieldGet(this, _toastShowClass));

      _classPrivateFieldGet(this, _element).classList.add(_classPrivateFieldGet(this, _toastHideClass));

      this.trigger('hide'); // if we're animating there's a chance that the toast could be focused whilst it's disappearing. This prevents a
      // `:hover`ed or `:focus`ed toast from being hidden and removed.

      if (_classPrivateFieldGet(this, _animation)) {
        var mouseOverHandler = function mouseOverHandler() {
          _this4.show();

          _classPrivateFieldGet(_this4, _element).removeEventListener('transitionstart', transitionStartHandler);

          _classPrivateFieldGet(_this4, _element).removeEventListener('transitionend', transitionEndHandler);

          _classPrivateFieldGet(_this4, _element).removeEventListener('mouseover', mouseOverHandler);

          _classPrivateFieldGet(_this4, _element).addEventListener('mouseout', function () {
            _this4.hide();
          });
        },
            transitionStartHandler = function transitionStartHandler() {
          if (bound) {
            return;
          }

          bound = !_classPrivateFieldGet(_this4, _element).addEventListener('transitionend', transitionEndHandler);
        },
            transitionEndHandler = function transitionEndHandler() {
          _this4.remove();
        };

        var bound = false;

        _classPrivateFieldGet(this, _element).addEventListener('mouseover', mouseOverHandler);

        _classPrivateFieldGet(this, _element).addEventListener('transitionstart', transitionStartHandler);

        return;
      }

      this.remove();
    }
  }, {
    key: "remove",
    value: function remove() {
      // Safety as `remove` can end up being called multiple times
      if (_classPrivateFieldGet(this, _element).parentNode === _classPrivateFieldGet(this, _container)) {
        _classPrivateFieldGet(this, _container).removeChild(_classPrivateFieldGet(this, _element));

        this.trigger('remove');
      }
    }
  }, {
    key: "buildClose",
    value: function buildClose(closeLabel) {
      var _this5 = this;

      var closeButton = document.createElement('button');
      closeButton.setAttribute('title', closeLabel);
      closeButton.appendChild(document.createTextNode(closeLabel));
      closeButton.addEventListener('click', function () {
        _this5.hide();
      });
      return closeButton;
    }
  }, {
    key: "getContainer",
    value: function getContainer(_ref6) {
      var containerClass = _ref6.containerClass,
          containerElement = _ref6.containerElement,
          root = _ref6.root;
      var existingContainer = root.querySelector("".concat(containerElement, ".").concat(containerClass));

      if (existingContainer) {
        return existingContainer;
      }

      var container = document.createElement(containerElement);
      container.classList.add(containerClass);
      root.appendChild(container);
      return container;
    }
  }, {
    key: "on",
    value: function on(event, callable) {
      if (!_classPrivateFieldGet(this, _events)[event]) {
        _classPrivateFieldGet(this, _events)[event] = [];
      }

      _classPrivateFieldGet(this, _events)[event].push(callable);
    }
  }, {
    key: "off",
    value: function off(event) {
      var callable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!callable) {
        return _classPrivateFieldGet(this, _events)[event] = [];
      }

      _classPrivateFieldGet(this, _events)[event] = _classPrivateFieldGet(this, _events).filter(function (eventCallable) {
        return eventCallable !== callable;
      });
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      var _this6 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_classPrivateFieldGet(this, _events)[event] || []).forEach(function (callable) {
        return callable.apply(void 0, [_this6, _classPrivateFieldGet(_this6, _element)].concat(args));
      });
    }
    /**
     * Used to override the default settings for all instances.
     *
     * @param settings Object See `#defaults` for details.
     */

  }], [{
    key: "settings",
    value: function settings(_settings) {
      _classStaticPrivateFieldSpecSet(Melba, Melba, _defaults, _objectSpread({}, _classStaticPrivateFieldSpecGet(Melba, Melba, _defaults), {}, _settings));
    }
  }]);

  return Melba;
}();

var _animation = new WeakMap();

var _container = new WeakMap();

var _element = new WeakMap();

var _events = new WeakMap();

var _hasFocus = new WeakMap();

var _hide = new WeakMap();

var _toastHideClass = new WeakMap();

var _toastShowClass = new WeakMap();

var _defaults = {
  writable: true,
  value: {
    animation: true,
    animationDuration: 400,
    closeLabel: 'Close',
    // TODO: i18n
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
    toastType: 'info'
  }
};
export { Melba as default };