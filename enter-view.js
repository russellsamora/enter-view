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
})(function() {

    const lib = function(opts) {
        
        let raf;
        let ticking;
        let distanceFromTop;
        let elements;

        const init = function() {
            hasValidOptions( err => {
                if (err) { console.error(err); }
                else {
                    setupRaf();
                    setupElements();
                    setupEvents();
                    updateScroll();     
                }
            });
        };

        const hasValidOptions = function(cb) {
            const required = ['selector', 'trigger'];

            for (let r in required) {
                if (!opts[required[r]]) {
                    cb('missing parameter: ' + required[r]);
                    return;
                }
            }

            cb(null);
        };
        
        const setupRaf = function() {
            raf = window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) { return setTimeout(callback, 1000 / 60); };
        };

        const setupElements = function() {
			// store all matching elements
            const nodeList = document.querySelectorAll(opts.selector);
            elements = [];
            for (let i = 0; i < nodeList.length; i++) {
                elements.push(nodeList[i]);
            }
		};

        const setupEvents = function() {
            window.addEventListener('resize', onResize, true);
            window.addEventListener('scroll', onScroll, true);

            // call once on init
            onResize();
        };

       
        const onResize = function() {
            // calculate offset from top to trigger at 
            distanceFromTop = getOffset();

        	updateScroll();
        };

        const onScroll = function() {
            if (!ticking) {
            	ticking = true;
                requestAnimationFrame(updateScroll);
            }
        };

        const updateScroll = function() {
            ticking = false;

			elements = elements.filter( el => {

                const rect = el.getBoundingClientRect();
                const top = rect.top;
                const bottom = rect.bottom;

                if (top < distanceFromTop) {
                    opts.trigger(el);
                    return false;
                }

                return true;
            });
            
            if (!elements.length) {
                window.removeEventListener('scroll', onScroll, true);
            }
        };

		const getOffset = function() {
			const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			if (opts.offset) {
				const num = parseInt(opts.offset.replace('%', '')) / 100;
				const fraction = Math.max(0, Math.min(100, num));
				return h - fraction * h;
			}
			return h;
		};

        init();
    };

    return lib;

});