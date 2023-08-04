
if (window.innerWidth < 768) {
	[].slice.call(document.querySelectorAll('[data-bss-disabled-mobile]')).forEach(function (elem) {
		elem.classList.remove('animated');
		elem.removeAttribute('data-bss-hover-animate');
		elem.removeAttribute('data-aos');
		elem.removeAttribute('data-bss-parallax-bg');
		elem.removeAttribute('data-bss-scroll-zoom');
	});
}




document.addEventListener('DOMContentLoaded', function() {

	var hoverAnimationTriggerList = [].slice.call(document.querySelectorAll('[data-bss-hover-animate]'));
	var hoverAnimationList = hoverAnimationTriggerList.forEach(function (hoverAnimationEl) {
		hoverAnimationEl.addEventListener('mouseenter', function(e){ e.target.classList.add('animated', e.target.dataset.bssHoverAnimate) });
		hoverAnimationEl.addEventListener('mouseleave', function(e){ e.target.classList.remove('animated', e.target.dataset.bssHoverAnimate) });
	});

	var products = document.querySelectorAll('[data-bss-dynamic-product]');

	for (var product of products) {
		var param = product.dataset.bssDynamicProductParam;
		product.dataset.reflowProduct = new URL(location.href).searchParams.get(param)
	}

}, false);

/*
function beforeUnloadListener(event) {
	event.preventDefault();
	return event.returnValue = 'Are you sure you want to exit?';
  };
  
  // A function that invokes a callback when the page has unsaved changes.
  onPageHasUnsavedChanges(() => {
	window.addEventListener('beforeunload', beforeUnloadListener);
  });
  
  // A function that invokes a callback when the page's unsaved changes are resolved.
  onAllChangesSaved(() => {
	window.removeEventListener('beforeunload', beforeUnloadListener);
  });
  */