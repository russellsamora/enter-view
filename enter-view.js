/*
* enter-view.js is library
*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory)
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory()
    } else {
        window.enterView = factory.call(this)
    }
})(() => {

	const lib = ({ selector, trigger, offset }) => {

		let raf
		let ticking
		let elements

		const setupRaf = () => {
			raf = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| window.msRequestAnimationFrame
			|| function(callback) { return setTimeout(callback, 1000 / 60) }
		}

		const getOffset = () => {
			const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
			if (offset) {
				const num = +(offset.replace('%', '')) / 100
				const fraction = Math.max(0, Math.min(100, num))
				return h - fraction * h
			}
			return h
		}

		const updateScroll = () => {
			ticking = false
			const distanceFromTop = getOffset()

			elements = elements.filter(el => {
				const rect = el.getBoundingClientRect()
				const top = rect.top

				if (top < distanceFromTop) {
					trigger(el)
					return false
				}

				return true
			})

			if (!elements.length) {
				window.removeEventListener('scroll', onScroll, true)
			}
		}

		const onScroll = () => {
			if (!ticking) {
				ticking = true
				raf(updateScroll)
			}
		}

		const onResize = () => {
			updateScroll()
		}

		const setupElements = () => {
			const nodeList = document.querySelectorAll(selector)
			elements = []
			for (let i = 0; i < nodeList.length; i++) {
				elements.push(nodeList[i])
			}
		}

		const setupEvents = () => {
			window.addEventListener('resize', onResize, true)
			window.addEventListener('scroll', onScroll, true)
			onResize()
		}

		const init = () => {
			const valid = selector && trigger
			if (!valid) console.error('must set selector and trigger options')
			setupRaf()
			setupElements()
			setupEvents()
			updateScroll()
		}

		init()
	}

	return lib

})
