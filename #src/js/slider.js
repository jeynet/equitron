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
})();