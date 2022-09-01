"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsFocusWithin = void 0;
exports.supportsFocusWithin = (() => {
    try {
        document.querySelector(':focus-within');
        return true;
    }
    catch (e) {
        return false;
    }
})();
exports.default = exports.supportsFocusWithin;
//# sourceMappingURL=supportsFocusWithin.js.map