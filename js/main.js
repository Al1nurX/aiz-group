window.onload = function () {

	function applyAnimations() {
		const screenWidth = window.innerWidth;

		if (screenWidth >= 1200) {
			gsap.from(".menu__list li", {
				duration: 1,
				opacity: 0,
				y: 20,
				stagger: 0.2,
			});
			gsap.from(".first-main-section__left h2", { duration: 1, opacity: 0.2, x: -30 });
		} else if (screenWidth >= 992) {
			gsap.from(".first-main-section__left h2", { duration: 1, opacity: 0, x: -20 });
		} else if (screenWidth >= 768) {
			gsap.from(".first-main-section__left h2", { duration: 1, opacity: 0, x: -15 });
		} else {
			gsap.from(".first-main-section__left h2", { duration: 1, opacity: 0, y: -15 });
		}
	}

	applyAnimations();

	let resizeTimeout;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(applyAnimations, 200);
	});

	gsap.to(".first-main-section__right img", {
		y: -10,
		repeat: -1,
		yoyo: true,
		ease: "power1.inOut",
		duration: 2,
	});
};

var swiper = new Swiper(".swiper", {
	slidesPerView: 3,
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
