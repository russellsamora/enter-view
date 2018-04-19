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
  const lib = ({ selector, trigger, offset }) => {
    let raf = null;
    let ticking = false;
    let elements = [];
    let height = 0;

    const setupRaf = () => {
      raf =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1000 / 60);
        };
    };

    const getOffsetHeight = () => {
      if (offset && typeof offset === 'number') {
        const fraction = Math.min(Math.max(0, offset), 1);
        return height - fraction * height;
      }
      return height;
    };

    const updateHeight = () => {
      const cH = document.documentElement.clientHeight;
      const wH = window.innerHeight || 0;
      height = Math.max(cH, wH);
    };

    const updateScroll = () => {
      ticking = false;
      const targetFromTop = getOffsetHeight();

      elements = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        const top = rect.top;
        if (top < targetFromTop) {
          trigger(el);
          return false;
        }

        return true;
      });

      if (!elements.length) {
        window.removeEventListener('scroll', onScroll, true);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf(updateScroll);
      }
    };

    const onResize = () => {
      updateHeight();
      updateScroll();
    };

    const setupElements = () => {
      elements = [...document.querySelectorAll(selector)];
    };

    const setupEvents = () => {
      window.addEventListener('resize', onResize, true);
      window.addEventListener('scroll', onScroll, true);
      onResize();
    };

    const init = () => {
      const valid = selector && trigger;
      if (!valid) console.error('must set selector and trigger options');
      setupRaf();
      setupElements();
      setupEvents();
      updateScroll();
    };

    init();
  };

  return lib;
});
