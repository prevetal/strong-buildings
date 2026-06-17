BODY = document.getElementsByTagName('body')[0]

// Mobile width
initAdaptiveViewport()

document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	const mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		const swiper = new Swiper(mainSlider, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: getCssVar(mainSlider, '--spaceBetween'),
			slidesPerView: getCssVar(mainSlider, '--slidesPerView'),
			lazy: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: mainSlider.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: mainSlider.querySelector('.swiper-button-next'),
				prevEl: mainSlider.querySelector('.swiper-button-prev')
			}
		})

		const updateNextThumb = (swiper) => {
			const nextIndex = (swiper.realIndex + 1) % swiper.slides.length,
				nextSlide = swiper.slides[nextIndex],
				nextImg = nextSlide?.querySelector('.image img'),
				thumb = mainSlider.querySelector('.swiper-button-next .thumb img')

			if (nextImg && thumb) {
				thumb.src = nextImg.src
			}
		}

		swiper.on('init', updateNextThumb)
		swiper.on('slideChange', updateNextThumb)
		swiper.emit('init')
	}


	// Products slider
	const productsSliders = [],
		products = document.querySelectorAll('.products .swiper')

	products.forEach((el, i) => {
		el.classList.add('products_s' + i)

		let options = {
			loop: false,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: el.querySelector('.swiper-button-next'),
				prevEl: el.querySelector('.swiper-button-prev')
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			breakpoints: {
				0: {
					spaceBetween: getCssVar(el, '--spaceBetween-0'),
					slidesPerView: getCssVar(el, '--slidesPerView-0'),
				},
				768: {
					spaceBetween: getCssVar(el, '--spaceBetween-768'),
					slidesPerView: getCssVar(el, '--slidesPerView-768'),
				},
				1280: {
					spaceBetween: getCssVar(el, '--spaceBetween-1280'),
					slidesPerView: getCssVar(el, '--slidesPerView-1280'),
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.product')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.product')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		productsSliders.push(new Swiper('.products_s' + i, options))
	})


	// Reviews slider
	const reviewsSliders = [],
		reviewsSlider = document.querySelectorAll('.reviews .swiper')

	reviewsSlider.forEach((el, i) => {
		el.classList.add('reviews_s' + i)

		const reviewsEl = el.closest('.reviews')

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: reviewsEl.querySelector('.swiper-button-next'),
				prevEl: reviewsEl.querySelector('.swiper-button-prev')
			},
			spaceBetween: getCssVar(el, '--spaceBetween'),
			slidesPerView: getCssVar(el, '--slidesPerView'),
		}

		reviewsSliders.push(new Swiper('.reviews_s' + i, options))
	})


	// Service production gallery
	const serviceProductionGallery = document.querySelector('.service_production .gallery'),
		serviceProductionGalleryBig = document.querySelector('.service_production .gallery .big .swiper'),
		serviceProductionGalleryThumbs = document.querySelector('.service_production .gallery .thumbs .swiper')

	if (serviceProductionGallery) {
		const thumbs = new Swiper(serviceProductionGalleryThumbs, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: getCssVar(serviceProductionGalleryThumbs, '--spaceBetween-0'),
					slidesPerView: getCssVar(serviceProductionGalleryThumbs, '--slidesPerView-0'),
				},
				768: {
					spaceBetween: getCssVar(serviceProductionGalleryThumbs, '--spaceBetween-768'),
					slidesPerView: getCssVar(serviceProductionGalleryThumbs, '--slidesPerView-768'),
				},
				1280: {
					spaceBetween: getCssVar(serviceProductionGalleryThumbs, '--spaceBetween-1280'),
					slidesPerView: getCssVar(serviceProductionGalleryThumbs, '--slidesPerView-1280'),
				}
			},
		})

		new Swiper(serviceProductionGalleryBig, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: getCssVar(serviceProductionGalleryBig, '--spaceBetween'),
			slidesPerView: getCssVar(serviceProductionGalleryBig, '--slidesPerView'),
			lazy: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			thumbs: {
				swiper: thumbs
			},
			navigation: {
				nextEl: serviceProductionGalleryBig.querySelector('.swiper-button-next'),
				prevEl: serviceProductionGalleryBig.querySelector('.swiper-button-prev')
			},
		})
	}


	// Fancybox
	const fancyOptions = {
		dragToClose: false,
		placeFocusBack: false,
		l10n: {
			CLOSE: 'Закрыть',
			NEXT: 'Следующий',
			PREV: 'Предыдущий',
			MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
		}
	}


	// Zoom images
	Fancybox.bind('.fancy_img', {
		...fancyOptions,
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Popover
	document.querySelectorAll('[popover]').forEach(el => {
		el.addEventListener('toggle', e => document.querySelector(`[popovertarget="${el.id}"]`)?.classList.toggle('active', e.newState === 'open'))
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu, .overlay').toggleClass('show')
	})


	$('.mob_menu .categories .link.main_link.sub_link').click(function(e) {
		e.preventDefault()

		$('.mob_menu .categories .link.sub_link').removeClass('active')
		$('.mob_menu .categories .sub_data').removeClass('show')

		$(this).addClass('active')
			.next('.sub_data').addClass('show')
	})


	$('.mob_menu .categories .sub_data .link.sub_link').click(function(e) {
		e.preventDefault()

		$('.mob_menu .categories .sub_data .link.sub_link').removeClass('active')
		$('.mob_menu .categories .sub_data .data').removeClass('show')

		$(this).addClass('active')
			.next('.data').addClass('show')
	})


	// Phone input mask
	new Maska.MaskInput('input[type=tel]', {
		mask: '+7 (###) ###-##-##'
	})


	// Select file
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('.path').innerText = el.value)
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)'),
		selectsInstances = []

	if (selects) {
		selects.forEach(el => {
			selectsInstances.push(NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			}))

			el.addEventListener('change', () => el.classList.add('selected'))

			if (el.querySelector('option[selected]')) {
				el.classList.add('selected')
			}
		})
	}


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub')

		// Submenu on the touch screen
		$('header .menu .item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	scrollBtns.forEach(el => {
		el.addEventListener('click', e => {
			e.preventDefault()

			const anchor = el.getAttribute('data-anchor')
			const target = document.getElementById(anchor)

			if (!target) return

			const popover = el.closest('[popover]')
			if (popover) popover.hidePopover()

			if (target.classList.contains('tab_content')) {
				const tabsContainer = target.closest('.tabs_container')
				const tabBtn = tabsContainer?.querySelector(`.tabs .btn[data-content="#${anchor}"]`)

				if (tabBtn && !tabBtn.classList.contains('active')) {
					tabBtn.click()
				}

				tabsContainer?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			} else {
				target.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}
		})
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			parent.find(`.tabs:first .btn[data-content="${activeTab}"]`).addClass('active')
			activeTabContent.addClass('active')

			let popover = $(this).closest('[popover]')

			if (popover.length) {
				popover[0].hidePopover()
			}

			$(this).closest('.tabs').find('.tabs_btn span').text($(this).text())
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Accordion
	$('body').on('click', '.accordion_item .top', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active')
				.find('.hidden').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.hidden').slideUp(300)

			item.addClass('active')
				.find('.hidden').slideDown(300)
		}
	})


	// Order buildin
	var orderBuildingCurrentStep = 1

	$('.order_building .full_mode_btn').click(function(e) {
		e.preventDefault()

		$('.order_building .form.short').hide()
		$('.order_building .form.full').fadeIn(200)

		document.querySelector('.order_building .form.full').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	$('.order_building .short_mode_btn').click(function(e) {
		e.preventDefault()

		$('.order_building .form.full').hide()
		$('.order_building .form.short').fadeIn(200)

		document.querySelector('.order_building .form.full').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	$('.order_building .next_btn').click(function(e) {
		e.preventDefault()

		orderBuildingCurrentStep++

		$('.order_building .form.full .step').removeClass('show')
		$('.order_building .form.full .step' + orderBuildingCurrentStep).addClass('show')

		document.querySelector('.order_building .form.full').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	$('.order_building .prev_btn').click(function(e) {
		e.preventDefault()

		orderBuildingCurrentStep = orderBuildingCurrentStep - 1

		$('.order_building .form.full .step').removeClass('show')
		$('.order_building .form.full .step' + orderBuildingCurrentStep).addClass('show')

		document.querySelector('.order_building .form.full').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	$('.order_building .edit_btn').click(function(e) {
		e.preventDefault()

		orderBuildingCurrentStep = parseInt($(this).data('step'))

		$('.order_building .form.full .step').removeClass('show')
		$('.order_building .form.full .step' + orderBuildingCurrentStep).addClass('show')

		document.querySelector('.order_building .form.full').scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		}, 1000)
	})


	// Catalog modal
	$('.catalog_mini_modal .categories .link.main_link.sub_link').click(function(e) {
		e.preventDefault()

		$('.catalog_mini_modal .categories .link.sub_link').removeClass('active')
		$('.catalog_mini_modal .categories .sub_data').removeClass('show')

		$(this).addClass('active')
			.next('.sub_data').addClass('show')
	})


	$('.catalog_mini_modal .categories .sub_data .link.sub_link').click(function(e) {
		e.preventDefault()

		$('.catalog_mini_modal .categories .sub_data .link.sub_link').removeClass('active')
		$('.catalog_mini_modal .categories .sub_data .data').removeClass('show')

		$(this).addClass('active')
			.next('.data').addClass('show')
	})


	// Catalog
	$('.catalog .link').on('mouseenter', function() {
		const subH = $(this).find('.sub')[0].scrollHeight

		$(this).css('--sub-h', subH + 'px')
	}).on('mouseleave', function() {
		$(this).css('--sub-h', '0px')
	})


	// Cookie
	$('.cookie_info .btn').click(function(e) {
		e.preventDefault()

		$('.cookie_info').fadeOut(200)
	})
})



window.addEventListener('load', function () {
	// Fix. header
	headerInit = true,
	headerHeight = $('header').outerHeight()

	$('header').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')


	// Aligning elements in the grid
	document.querySelectorAll('.FAQ_other .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		FAQOtherHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})


	// Ready buildings from stock pluses
	document.querySelectorAll('.ready_buildings_from_stock .pluses .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		readyBuildingsFromStockPlusesHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})
})


window.addEventListener('resize', function () {
	// Fix. header
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > headerHeight
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)


	// Aligning elements in the grid
	document.querySelectorAll('.FAQ_other .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		FAQOtherHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})


	// Ready buildings from stock pluses
	document.querySelectorAll('.ready_buildings_from_stock .pluses .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		readyBuildingsFromStockPlusesHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})
})



window.addEventListener('scroll', function () {
	// Fix. header
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > headerHeight
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})


// Ready buildings from stock pluses
function readyBuildingsFromStockPlusesHeight(context, step) {
	let start = 0,
		finish = step,
		items = [...context.querySelectorAll('.item')],
		itemName = context.querySelectorAll('.name'),
		i = 0

	itemName.forEach(el => el.style.height = 'auto')

	items.forEach(el => {
		items.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .name'))

		start = start + step
		finish = finish + step
		i++
	})
}



// FAQ other
function FAQOtherHeight(context, step) {
	let start = 0,
		finish = step,
		items = [...context.querySelectorAll('.item')],
		itemQuestion = context.querySelectorAll('.question'),
		i = 0

	itemQuestion.forEach(el => el.style.height = 'auto')

	items.forEach(el => {
		items.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .question'))

		start = start + step
		finish = finish + step
		i++
	})
}