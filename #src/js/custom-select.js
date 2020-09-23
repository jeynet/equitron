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

})();