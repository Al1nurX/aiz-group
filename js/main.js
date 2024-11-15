var swiper = new Swiper(".swiper", {
	slidesPerView: 3,
	spaceBetween: 30,
	// parallax: true,
	// loop: true,
	speed: 600,
	mousewheel: true,
	autoplay: {
		delay: 8000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
});