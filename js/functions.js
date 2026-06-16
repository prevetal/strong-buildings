const initAdaptiveViewport = () => {
	const viewportMeta = document.querySelector('meta[name="viewport"]')
	if (!viewportMeta) return

	const mqDeviceNarrow = window.matchMedia('(max-device-width: 374px)')

	const apply = () => {
		mqDeviceNarrow.matches
			? viewportMeta.setAttribute('content', 'width=375, user-scalable=no')
			: viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1')
	}

	apply()

	mqDeviceNarrow.addEventListener('change', apply)
}


const getCssVar = (el, name) => {
    const val = getComputedStyle(el).getPropertyValue(name).trim(),
    	num = parseFloat(val)

    return isNaN(num) ? val : num
}


const setHeight = (items) => {
	let maxheight = 0

	items.forEach(el => {
		if (el.offsetHeight > maxheight) maxheight = el.offsetHeight
	})

	items.forEach(el => el.style.height = maxheight + 'px')
}


const is_touch_device = () => !!('ontouchstart' in window)