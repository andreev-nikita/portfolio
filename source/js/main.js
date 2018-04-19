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

	let hideSideMenu = () => {
		$('body').toggleClass('stop-scroll')
		$('#slide-menu-container').animate({
			width: 'toggle'	
		}, 350);
		$('.slide-menu__item').unbind();
	}

	$('.slide-menu__item').bind('click', hideSideMenu);

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


//	 Smooth scrolling

	let smoothScroll = (event, id) => {
		$('.smooth-scroll').unbind();
		event.preventDefault();
		let top = $(id).offset().top;
		$('html').animate({
	        scrollTop: top
	    }, 1000, () => {
	    	$('.smooth-scroll').bind('click', function (event) { 
				smoothScroll(event, $(this).attr('href'));
			});
			$('.slide-menu__item').bind('click', hideSideMenu);
	    });
	}

	$('.smooth-scroll').bind('click', function (event) { 
		smoothScroll(event, $(this).attr('href'));
	});



// Ajax sending mail
	$('#contacts-form__button').click( () => {	
		let mailCheck = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			nameCheck = /.+/,
			messageCheck = /.+/;
 
		if(nameCheck.test($('#contacts-form__name').val()) == false) {
			$('#contacts-form__name').addClass('contacts-form__wrong');
			setTimeout( () => {
				$('#contacts-form__name').removeClass('contacts-form__wrong');
			}, 1200);
		} else {
			if(mailCheck.test($('#contacts-form__mail').val()) == false) {
				$('#contacts-form__mail').addClass('contacts-form__wrong');
				setTimeout( () => {
					$('#contacts-form__mail').removeClass('contacts-form__wrong');
				}, 1200);
			} else {
				if(messageCheck.test($('#contacts-form__text').val()) == false) {
					$('#contacts-form__text').addClass('contacts-form__wrong');
					setTimeout( () => {
						$('#contacts-form__text').removeClass('contacts-form__wrong');
					}, 1200);
				} else {
					$('#contacts-form').submit();
				}
			}
		}
	})
	
	$('#contacts-form').submit( function(event) { 
    	event.preventDefault();
        $.ajax({
	        type: "POST", 
	        url: "../send.php", 
	        data: $(this).serialize(),
	        success: function() {
               alert("Ваше сообщение отправлено!");
               $('#contacts-form__mail').val('');
               $('#contacts-form__name').val('');
               $('#contacts-form__text').val('');
	        }
    	});
    });

})