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

    var lib = function(opts) {
        
        var _ticking;
        var _distanceFromTop;
		var _elements = [];

        var init = function() {
            window.requestAnimatoinFrame = raf();

            var isValid = hasValidParams();

            if (isValid) {
				setupDefaultParams();
				setupElements();
				setupEvents();
				updateScroll(); 
			}
        };

        var hasValidParams = function() {

            return true;
        };
        
        var setupDefaultParams = function() {
            
        };

        var setupElements = function() {
			// calculate offset from top to trigger at 
			_distanceFromTop = getOffset();
			
			// store all matching elements
			var query = document.getElementsByClassName(opts.selector);
			for (var i = 0; i < query.length; i++) {
				_elements.push(query[i]);
			}
		};

        var setupEvents = function() {
            window.addEventListener('resize', onResize, true);
            window.addEventListener('scroll', onScroll, true);
        };

       
        var onResize = function() {
        	updateScroll();
        };

        var onScroll = function() {
            if (!_ticking) {
            	_ticking = true;
                requestAnimationFrame(updateScroll);
            }
        };

        var updateScroll = function() {
            _ticking = false;

            var remove = [];
			var len = _elements.length;

			for (var i = 0; i < len; i++) {
				var el = _elements[i];
				var rect = el.getBoundingClientRect();
				var top = rect.top;
				var bottom = rect.bottom;

				if (top < _distanceFromTop) {
					opts.func(el);
					remove.push(i);
				}
			}

			removeElements(remove);
        };

		var removeElements = function(remove) {
			var len = remove.length;
			for (var r = 0; r < len; r++) {
				_elements.splice(r, 1);
				r -=1;
				len = r.length;
			}

			if (!_elements.length) {
				window.removeEventListener('scroll', onScroll, true);
			}
		};

		var getOffset = function() {
			var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			if (opts.offset) {
				var num = parseInt(opts.offset.replace('%', '')) / 100;
				var fraction = Math.max(0, Math.min(100, num));
				return h - fraction * h;
			}
			return h;
		};

        var raf = function() {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function(callback) { return setTimeout(callback, 1000 / 60); };
        };

        init();
    };

    return lib;

});