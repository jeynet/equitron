(function(){
	let sliderContainer = document.querySelector('.main-slider__container');
	let sliderSlide = document.querySelectorAll('.main-slider__slide');

	let sliderLeftBtn = document.querySelector('.main-slider__btn--left');
	let sliderRightBtn = document.querySelector('.main-slider__btn--right');

	let startWidth = 0;
	let offsetWidth = 0;
	let position = 0;

	startWidth = sliderSlide[0].offsetWidth;
	sliderSlide.forEach(function(elm){
		offsetWidth += elm.offsetWidth;
	});

	sliderContainer.style.width = offsetWidth + 'px';
	
	function moveSlider() {
		if(this.classList.contains('main-slider__btn--right')){
			if(position < offsetWidth - startWidth){
				position += startWidth;
				sliderContainer.style.left = '-' + position + 'px';
				currentPosition = sliderContainer.style.left;
			}
		 	return false;
		}

		if(position != 0){
			sliderContainer.style.left = '-' + (position - startWidth) + 'px';
			position -= startWidth;
		}
	}

	sliderLeftBtn.addEventListener('click', moveSlider);
	sliderRightBtn.addEventListener('click', moveSlider);
})();;
(function(){
	let customSelectTitle = document.querySelectorAll('.custom-select__title');

	function openAndHiddenBody() {
		let startHeight = 0;
		let parent = this.parentNode;
		let body = parent.querySelector('.custom-select__body');
		let items = parent.querySelectorAll('.custom-select__item');
		let firstItem = parent.querySelector('.custom-select__item--first');
		let hiddenInput = parent.querySelector('.custom-select__hidden-input');
		let iconArrow = parent.querySelector('.icon-select');

		if(!body.classList.contains('custom-select__body--visible')){
			items.forEach(function(elm) {
				startHeight += elm.offsetHeight;
				elm.onclick = function() {
					firstItem.textContent = elm.textContent;
					hidden();
					hiddenInput.value = elm.textContent;
				};
			});
			iconArrow.style.transform = 'rotate(-180deg)';
			body.classList.add('custom-select__body--visible');
			body.style.height = startHeight + 'px';
			return false;
		};


		function hidden() {
			iconArrow.style.transform = 'rotate(0deg)';
			body.style.height = 25 + 'px';
			body.classList.remove('custom-select__body--visible');
		};
		hidden();

	};

	customSelectTitle.forEach(function(elm){
		elm.addEventListener('click', openAndHiddenBody);
	});

})();;
(function(){
	let btnOpen = document.querySelector('.open-menu');
	let btnClose = document.querySelector('.main-nav__exit-mobile-menu button');
	let mainNav = document.querySelector('.header .main-nav ul');

	function openAndHiddenMenu() {
		if(!mainNav.classList.contains('main-nav-visible')){
			mainNav.style.left = '0px';
			mainNav.classList.add('main-nav-visible');
			return false;
		}

		mainNav.style.left = '-1500px';
		mainNav.classList.remove('main-nav-visible');
	};

	btnOpen.addEventListener('click', openAndHiddenMenu);
	btnClose.addEventListener('click', openAndHiddenMenu);
})();;