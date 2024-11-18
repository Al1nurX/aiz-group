var swiper = new Swiper(".swiper", {
	slidesPerView: 3,
	// loop: true,
	speed: 600,
	mousewheel: {
		forceToAxis: true,
	},
	autoplay: {
		delay: 8000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 15,
		},
		480: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween: 25,
		},
		1280: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});