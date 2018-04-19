$(document).ready( () => {

	let width = $('.divslider').width(),
		itemsCount = $('.divslider__viewport').children().length,
		currentItem = 1;

	let setViewportWidth = () => {
		width = $('.divslider').width();
		let viewportWidth = (itemsCount) * width;
		let currentTransform = -((currentItem - 1) * width);
		$('.divslider__viewport').css('transition', 'all 0s ease 0s');
		$('.divslider__viewport').css('transform', `translateX(${currentTransform}px)`);
		$('.divslider__viewport').css('width', `${viewportWidth}px`);
		$('.divslider__item').css('width', width);
		$('.divslider__viewport').css('visibility', 'visible');
		$('.divslider__viewport').css('transition', 'transform 1s ease 0s');
	}

	let slideToTheNext = () => {
		if(currentItem < itemsCount) {
			let currentTransform = -(currentItem * width);
			$('.divslider__viewport').css('transform', `translateX(${currentTransform}px)`);
			$(`.slider-selectors__item:nth-child(${currentItem})`).removeClass('slider-selectors__item_active');
			currentItem++;
			$(`.slider-selectors__item:nth-child(${currentItem})`).addClass('slider-selectors__item_active');
		}
	}

	let slideToThePrev = () => {
		if(currentItem > 1) {
			let currentTransform = -((currentItem - 2)* width);
			$('.divslider__viewport').css('transform', `translateX(${currentTransform}px)`);
			$(`.slider-selectors__item:nth-child(${currentItem})`).removeClass('slider-selectors__item_active');
			currentItem--;
			$(`.slider-selectors__item:nth-child(${currentItem})`).addClass('slider-selectors__item_active');
		}
	}

	let slideToTheItem = (nextItem) => {
		// console.log(`next: ${nextItem}   current: ${currentItem}`);
		if((nextItem >= 1) && (nextItem <= itemsCount) && (nextItem != currentItem)) {
			let currentTransform = -((nextItem - 1) * width);
			$('.divslider__viewport').css('transform', `translateX(${currentTransform}px)`);
			$(`.slider-selectors__item:nth-child(${currentItem})`).removeClass('slider-selectors__item_active');
			currentItem = nextItem;
			$(`.slider-selectors__item:nth-child(${currentItem})`).addClass('slider-selectors__item_active');
		}
	}

	setViewportWidth();
	$(window).resize(setViewportWidth);

	$('#next-slide').click( () => {
		slideToTheNext();
	})

	$('#prev-slide').click( () => {
		slideToThePrev();
	})

	$('.slider-selectors__item').click( function () {
		let nextItem = $('.slider-selectors__item').index(this) + 1;
		slideToTheItem(nextItem);
	})
})