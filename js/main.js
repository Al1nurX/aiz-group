// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
	const applyAnimations = () => {
		const screenWidth = window.innerWidth;
		const commonAnimation = {
			duration: 1,
			opacity: 0,
		};

		gsap.killTweensOf(".menu__list li, .main-section__left h2, .main-section__right img");

		if (screenWidth >= 1200) {
			gsap.from(".menu__list li", { ...commonAnimation, y: 20, stagger: 0.2 });
			gsap.from(".main-section__left h2", { ...commonAnimation, x: -30 });
		} else if (screenWidth >= 992) {
			gsap.from(".menu__list li", { ...commonAnimation, y: 20, stagger: 0.2 });
			gsap.from(".main-section__left h2", { ...commonAnimation, x: -20 });
		} else if (screenWidth >= 768) {
			gsap.from(".menu__list li", { ...commonAnimation, y: 15, stagger: 0.2 });
			gsap.from(".main-section__left h2", { ...commonAnimation, x: -15 });
		} else {
			gsap.from(".menu__list li", { ...commonAnimation, y: 10, stagger: 0.2 });
			gsap.from(".main-section__left h2", { ...commonAnimation, x: 15 });
		}
	};

	let resizeTimeout;
	applyAnimations();

	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(applyAnimations, 200);
	});

	gsap.to(".main-section__right img", {
		y: -10,
		repeat: -1,
		yoyo: true,
		ease: "power1.inOut",
		duration: 2,
	});

	// gsap.from(".about-me__left", {
	//   x: -50,
	//   opacity: 0,
	//   duration: 1,
	//   ease: "power3.out",
	//   scrollTrigger: {
	//     trigger: ".about-me__section",
	//     start: "top 80%",
	//     toggleActions: "play reverse play reverse",
	//   },
	// });

	// gsap.from(".about-me__right", {
	//   x: 50,
	//   opacity: 0,
	//   duration: 1,
	//   ease: "power3.out",
	//   scrollTrigger: {
	//     trigger: ".about-me__section",
	//     start: "top 80%",
	//     toggleActions: "play reverse play reverse",
	//   },
	// });
});

// Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
	const scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1000,
		easing: 'easeInOutQuad',
		offset: (anchor) => {
			const elementHeight = anchor.getBoundingClientRect().height;
			const viewportHeight = window.innerHeight;
			return Math.max((viewportHeight - elementHeight) / 2, 0);
		},
	});

	const footerButton = document.getElementById('scroll-to-footer');
	if (footerButton) {
		footerButton.addEventListener('click', () => {
			scroll.animateScroll(document.querySelector('#footer'));
		});
	}
});

// Form Submission
document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact__form');
	const successMessage = document.getElementById('success__message');
	const errorMessage = document.querySelector('.error__message');

	if (form) {
		const isEmptyOrSpaces = (str) => !str || str.trim().length === 0;

		const validateInput = (input) => {
			if (isEmptyOrSpaces(input.value)) {
				input.style.borderColor = 'red';
			} else {
				input.style.borderColor = '';
				errorMessage.style.display = 'none';
			}
		};

		form.addEventListener('input', (event) => {
			if (event.target.tagName === 'INPUT' && event.target.type === 'text') {
				validateInput(event.target);
			}
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const inputs = form.querySelectorAll('input[type="text"]');
			let hasError = false;

			inputs.forEach((input) => {
				validateInput(input);
				if (isEmptyOrSpaces(input.value)) {
					hasError = true;
				}
			});

			if (hasError) {
				errorMessage.textContent = 'Пожалуйста, заполните все обязательные поля.';
				errorMessage.style.display = 'block';
				return;
			} else {
				errorMessage.style.display = 'none';
			}

			const formData = new FormData(form);

			fetch(form.action, {
				method: 'POST',
				body: formData,
			})
				.then((response) => {
					if (response.ok) {
						form.style.display = 'none';
						successMessage.style.display = 'block';
					} else {
						alert('Ошибка при отправке формы. Пожалуйста, попробуйте снова.');
					}
				})
				.catch((error) => {
					console.error('Ошибка:', error);
					alert('Ошибка при отправке формы. Пожалуйста, попробуйте снова.');
				});
		});
	}
});

// Carousel
document.addEventListener('DOMContentLoaded', () => {
	new Swiper(".swiper", {
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
});