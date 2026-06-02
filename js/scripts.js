BODY = document.getElementsByTagName('body')[0]

document.addEventListener('DOMContentLoaded', function() {
	// Mobile width
	initAdaptiveViewport()


	// Main slider
	const mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper(mainSlider, {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: getCssVar(mainSlider, '--spaceBetween'),
			slidesPerView: getCssVar(mainSlider, '--slidesPerView'),
			lazy: true,
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


	// Modals
	document.querySelectorAll('[popover]').forEach(el => {
		el.addEventListener('toggle', e => document.body.classList.toggle('lock', e.newState === 'open'))
	})

	document.querySelectorAll('.modal .container').forEach(wrapper => {
		wrapper.addEventListener('click', e => {
			if (e.target === wrapper) {
				wrapper.closest('[popover]').hidePopover()
			}
		})
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu, .overlay').toggleClass('show')
	})


	// 'Up' button
	$('.buttonUp .btn').click((e) => {
		e.preventDefault()

		$('html, body').scrollTop(0)
		// $('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
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

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


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

			$(this).addClass('active')
			activeTabContent.addClass('active')
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
})



window.addEventListener('load', function () {
	// Aligning elements in the grid
	document.querySelectorAll('.FAQ_other .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		FAQOtherHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})
})



window.addEventListener('scroll', function () {
	// 'Up' button
	$(window).scrollTop() > $(window).innerHeight()
		? $('.buttonUp').fadeIn(300)
		: $('.buttonUp').fadeOut(200)
})



window.addEventListener('resize', function () {
	// Aligning elements in the grid
	document.querySelectorAll('.FAQ_other .grid_row').forEach(el => {
		let styles = getComputedStyle(el)

		FAQOtherHeight(el, parseInt(styles.getPropertyValue('--items_per_line')))
	})
})



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