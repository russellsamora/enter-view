/*
* enter-view.js is library
*/

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    window.enterView = factory.call(this);
  }
})(() => {
  const lib = ({ selector, enter, exit, offset = 0, once = false }) => {
    let raf = null;
    let ticking = false;
    let elements = [];
    let height = 0;

    function setupRaf() {
      raf =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1000 / 60);
        };
    }

    function getOffsetHeight() {
      if (offset && typeof offset === 'number') {
        const fraction = Math.min(Math.max(0, offset), 1);
        return height - fraction * height;
      }
      return height;
    }

    function updateHeight() {
      const cH = document.documentElement.clientHeight;
      const wH = window.innerHeight || 0;
      height = Math.max(cH, wH);
    }

    function updateScroll() {
      ticking = false;
      const targetFromTop = getOffsetHeight();

      elements = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        const top = rect.top;
        const entered = top < targetFromTop;
        if (entered && !el.__enter_view) {
          enter(el);
          if (once) return false;
        } else if (!entered && el.__enter_view && exit) exit(el);

        el.__enter_view = entered;
        return true;
      });

      if (!elements.length) {
        window.removeEventListener('scroll', onScroll, true);
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        raf(updateScroll);
      }
    }

    function onResize() {
      updateHeight();
      updateScroll();
    }

    function selectionToArray(selection) {
      const len = selection.length;
      const result = [];
      for (let i = 0; i < len; i += 1) {
        result.push(selection[i]);
      }
      return result;
    }

    function selectAll(selector, parent = document) {
      if (typeof selector === 'string') {
        return selectionToArray(parent.querySelectorAll(selector));
      } else if (selector instanceof NodeList) {
        return selectionToArray(selector);
      } else if (selector instanceof Array) {
        return selector;
      }
    }

    function setupElements() {
      elements = selectAll(selector);
    }

    function setupEvents() {
      window.addEventListener('resize', onResize, true);
      window.addEventListener('scroll', onScroll, true);
      onResize();
    }

    function init() {
      const valid = selector && enter;
      if (!valid) console.error('must set selector and enter options');
      setupRaf();
      setupElements();
      setupEvents();
      updateScroll();
    }

    init();
  };

  return lib;
});
