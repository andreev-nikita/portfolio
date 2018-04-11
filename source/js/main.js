$(document).ready( () => {

//  Show/Hide Side Menu
	let showSideMenu = () => {
		$('#hamburger').unbind();
		$('body').toggleClass('stop-scroll')
		$('#slide-menu-container').animate({
			width: 'toggle'
		}, 350, () => {
			$('#hamburger').bind('click', showSideMenu);
		});
	}
	$('#hamburger').bind('click', showSideMenu);


//   Changing size and opacity of the top menu

	let windowHeight = $(window).height();
	const menuStartHeight = parseInt($('#navigation-menu').css('height'), 10),
		  menuEndHeight = 50;

	let IncremStep = (menuStartHeight - menuEndHeight) / (windowHeight);

	let changeCssValues = () => {
		let currentHeight = menuStartHeight - ($(window).scrollTop() * IncremStep);
		if ((currentHeight >= menuEndHeight) && (currentHeight <= menuStartHeight)) {
			$('#navigation-menu').css('height', `${currentHeight}px`);
			$('#logo').css('line-height', `${currentHeight}px`);
			$('#slide-menu-container').css('top', `${currentHeight}px`);
		} else if (currentHeight < menuEndHeight) {
			$('#navigation-menu').css('height', `${menuEndHeight}px`);
			$('#logo').css('line-height', `${menuEndHeight}px`);
			$('#slide-menu-container').css('top', `${menuEndHeight}px`);
		} 
	} 

	changeCssValues();
	$('#navigation-menu').css('visibility', 'visible');
	$(window).scroll(changeCssValues);


})