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
})();