document.addEventListener("DOMContentLoaded", function () {
	gsap.registerPlugin(ScrollTrigger);

	const scroll = new LocomotiveScroll({
		el: document.querySelector("[data-scroll-container]"),
		smooth: true,
	});

	scroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.scrollerProxy("[data-scroll-container]", {
		scrollTop(value) {
			return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
		},
		getBoundingClientRect() {
			return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
		},
		pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
	});

	ScrollTrigger.addEventListener("refresh", () => scroll.update());
	ScrollTrigger.refresh();

	function applyAnimations() {
		const screenWidth = window.innerWidth;
		console.log("Applying animations for screen width:", screenWidth);

		if (screenWidth >= 1200) {
			gsap.from(".menu__list li", {
				duration: 1,
				opacity: 0,
				y: 20,
				stagger: 0.2,
			});
			gsap.from(".first-main-section__left h2", { duration: 1, opacity: 0.2, x: -30 });
			gsap.from(".about__me-item", { duration: 1, opacity: 0, y: 30, stagger: 0.25 });
			gsap.from(".second-main-section__right", { duration: 1, opacity: 0.2, x: 30 });
		} else if (screenWidth >= 992) {
			gsap.from(".first-main-section__left", { duration: 1, opacity: 0, x: -20 });
			gsap.from(".about__me-item", { duration: 1, opacity: 0, y: 20, stagger: 0.25 });
			gsap.from(".first-main-section__right", { duration: 1, opacity: 1, x: 20 });
		} else if (screenWidth >= 768) {
			gsap.from(".first-main-section__left", { duration: 1, opacity: 0, x: -15 });
			gsap.from(".about__me-item", { duration: 1, opacity: 0, y: 15, stagger: 0.25 });
			gsap.from(".first-main-section__right", { duration: 1, opacity: 1, x: 15 });
		} else {
			gsap.from(".first-main-section__left", { duration: 1, opacity: 0, y: -15 });
			gsap.from(".about__me-item", { duration: 1, opacity: 0, y: 15, stagger: 0.25 });
			gsap.from(".first-main-section__right", { duration: 1, opacity: 1, x: 15 });
		}
	}

	gsap.to(".first-main-section__right img, .second-main-section__left", {
		y: -10,
		repeat: -1,
		yoyo: true,
		ease: "power1.inOut",
		duration: 2,
	});

	// gsap.to(".reviews__section h3", {
	// 	duration: 2,
	// 	text: "отзывы",
	// 	ease: "none",
	// });

	// gsap.fromTo(".services-section-cards__item",
	// 	{ opacity: 0, y: 50 },
	// 	{
	// 		opacity: 1,
	// 		y: 0,
	// 		scrollTrigger: {
	// 			trigger: ".services-section-cards__item",
	// 			start: "top 80%",
	// 			end: "bottom 20%",
	// 			scrub: true,
	// 			toggleActions: "play reverse play reverse",
	// 		}
	// 	}
	// );

	applyAnimations();

	window.addEventListener("resize", applyAnimations);
});

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
