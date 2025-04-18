"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if ($.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/* ScrollUp */
	if ($.prototype.scrollUp) {
		$.scrollUp();
	}

	/* Responsive Navigation */
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click", function () {
		let $nav = $("nav#nav-mobile ul");
		if ($nav.hasClass("expanded")) {
			$nav.removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$nav.addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile ul a").on("click", function (e) {
		let href = $(this).attr("href");
		if (typeof href === "string" && href.indexOf("#") !== -1) {
			e.preventDefault();
			let target = $(href);
			$('html, body').animate({ scrollTop: target.offset().top }, 500);
			let $nav = $("nav#nav-mobile ul");
			if ($nav.hasClass("expanded")) {
				$nav.removeClass("expanded").slideUp(250);
				$("#nav-trigger span").removeClass("open");
			}
		}
	});

	/* Sticky Navigation */
	if ($.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	/* Header transition on scroll */
	$('#content').waypoint(function (direction) {
		$('#header').toggleClass('nav-solid fadeInDown', direction === 'down');
	});
});

/* Preloader and animations */
$(window).on('load', function () {
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({ 'overflow-y': 'visible' });

	/* WOW Elements */
	if (typeof WOW === 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if ($.prototype.enllax) {
		$(window).enllax();
	}
});
