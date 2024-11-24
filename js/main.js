// GSAP Animations
document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);

	const mm = gsap.matchMedia();
	const breakPointDesktop = 1024;
	const breakPointTablet = 768;

	const commonAnimation = {
		duration: 1,
		opacity: 0,
	};

	const commonScrollTriggerSettings = {
		start: "top 85%",
		end: "bottom 15%",
		toggleActions: "play reverse play reverse",
	};

	mm.add(
		{
			isDesktop: `(min-width: ${breakPointDesktop}px)`,
			isTablet: `(min-width: ${breakPointTablet}px) and (max-width: ${breakPointDesktop - 1}px)`,
			isMobile: `(max-width: ${breakPointTablet - 1}px)`,
			reduceMotion: "(prefers-reduced-motion: reduce)",
		},
		(context) => {
			const { isDesktop, isTablet, isMobile } = context.conditions;

			const yOffset = isDesktop ? 20 : isTablet ? 15 : 10;
			const xOffsetMainSection = isDesktop ? -25 : isTablet ? -20 : 15;

			gsap.from(".menu__list li", {
				...commonAnimation,
				y: yOffset,
				stagger: 0.2,
			});

			gsap.from(".main-section__left h2", {
				...commonAnimation,
				x: xOffsetMainSection,
			});

			const aboutMeAnimation = (selector, xOffset, yOffset) => {
				gsap.from(selector, {
					...commonAnimation,
					x: xOffset,
					y: yOffset,
					scrollTrigger: {
						trigger: ".about-me__section",
						...commonScrollTriggerSettings,
					},
				});
			};

			aboutMeAnimation(".about-me__left", isDesktop ? -30 : isTablet ? -20 : 0, isMobile ? 15 : 0);
			aboutMeAnimation(".about-me__right", isDesktop ? 30 : isTablet ? 20 : 0, isMobile ? 15 : 0);

			const servicesCards = [
				{ selector: ".services-section-card__seminar", xOffset: isDesktop ? -30 : isTablet ? -20 : -15 },
				{ selector: ".services-section-card__communication", xOffset: isDesktop ? -30 : isTablet ? -20 : 15 },
				{ selector: ".services-section-card__concentration", xOffset: isDesktop ? 30 : isTablet ? 20 : -15 },
				{ selector: ".services-section-card__compliance", xOffset: isDesktop ? 30 : isTablet ? 20 : 15 },
			];

			servicesCards.forEach(({ selector, xOffset }) => {
				gsap.from(selector, {
					...commonAnimation,
					x: xOffset,
					scrollTrigger: {
						trigger: ".services__section",
						...commonScrollTriggerSettings,
					},
				});
			});

			gsap.from(".swiper", {
				duration: 1,
				opacity: 0.5,
				y: isDesktop ? 30 : isTablet ? 20 : 15,
				scrollTrigger: {
					trigger: ".reviews__section",
					...commonScrollTriggerSettings,
				},
			});

			gsap.to(".main-section__right img", {
				y: -10,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
				duration: 2,
			});

			return () => context.revert();
		}
	);
});

// Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
	const scroll = new SmoothScroll('a[href*="#"]', {
		speed: 1100,
		speedAsDuration: false,
		durationMax: 2000,
		durationMin: 1000,
		easing: 'easeInOutQuad',
		clip: true,
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
	const loader = document.getElementById('loader');

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
			if (
				event.target.tagName === 'INPUT' &&
				event.target.type === 'text' &&
				event.target.name !== '_honey'
			) {
				validateInput(event.target);
			}
		});

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const inputs = form.querySelectorAll('input[type="text"]:not([name="_honey"])');
			const honeypot = form.querySelector('[name="_honey"]');
			let hasError = false;

			if (!isEmptyOrSpaces(honeypot.value)) {
				console.log('Spam detected! Honeypot field should be empty.');
				errorMessage.textContent = 'Форма не отправлена. Пожалуйста, попробуйте снова.';
				errorMessage.style.display = 'block';
				return;
			}

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

			if (loader) {
				loader.style.display = 'block';
				form.style.display = 'none';
			}

			const formData = new FormData(form);

			fetch(form.action, {
				method: 'POST',
				body: formData,
			})
				.then((response) => {
					loader.style.display = 'none';
					if (response.ok) {
						form.style.display = 'none';
						successMessage.style.display = 'block';
					} else {
						errorMessage.textContent = 'Ошибка при отправке формы. Пожалуйста, попробуйте снова.';
						errorMessage.style.display = 'block';
					}
				})
				.catch((error) => {
					console.error('Ошибка:', error);
					loader.style.display = 'none';
					errorMessage.textContent = 'Ошибка при отправке формы. Пожалуйста, попробуйте снова.';
					errorMessage.style.display = 'block';
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