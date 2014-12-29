$(function() {
	if (navigator.userAgent.indexOf("MSIE") != -1) {
		$('#eru img').each(function() {
			if ($(this).attr('src').indexOf('.png') != -1) {
				$(this).css({
					'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
					$(this).attr('src') +
					'", sizingMethod="scale");'
				});
			}
		});
	}
	$('#globalFooterWrap').css('display', 'block');
	$('#topUpdateInfo').carouFredSel({
		items: {
			visible: 1,
			width: 720,
			height: 150
		},
		scroll: {
			fx: 'scroll',
			duration: 800,
			pauseOnHover: true
		},
		auto: {
			play: false
		},
		prev: '.prev',
		next: '.next'
	}, {
		wrapper: {
			classname: 'topUpdateInfoWrapper'
		}
	});
});
$(window).load(function() {
	$('#maxbg').maximage({
		onFirstImageLoaded: function() {
			$('#maxbg').fadeIn(1000);
		}
	});
	$('#siteWrap').fadeIn(2000);
	$('#topCatch-01').delay(1500).animate({width: 370}, {duration: 2500, easing: 'linear'});
	$('#topCatch-02').delay(5000).animate({width: 250}, {duration: 1700, easing: 'linear'});
	$('#topCatch-03').delay(7700).animate({width: 250}, {duration: 1700, easing: 'linear'});
	$('#topOnair-01').delay(11400).animate({width: 280}, {duration: 1000, easing: 'linear'});
	$('#topOnair-02').delay(12900).animate({width: 390}, {duration: 1000, easing: 'linear'});
	$('#siteWrap').snowfall({
		flakeCount: 8,
		flakeIndex: -1,
		maxSpeed: 6,
		minSpeed: 2,
		maxSize: 32,
		minSize: 4,
		image: '/img/kotenbu/sakura/sakura-'
	});
	setGlobalNavPos();
	(function(w,d){
		w._gaq=[["_setAccount","UA-17203208-1"],["_trackPageview"]];
		w.___gcfg={lang:"ja"};
		var s,e = d.getElementsByTagName("script")[0],
		a=function(u,f){if(!d.getElementById(f)){s=d.createElement("script");
		s.src=u;if(f){s.id=f;}e.parentNode.insertBefore(s,e);}};
		a(("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js","ga");
		a("//b.st-hatena.com/js/bookmark_button_wo_al.js");
		a("//platform.twitter.com/widgets.js","twitter-wjs");
		a("//connect.facebook.net/ja_JP/all.js#xfbml=1","facebook-jssdk");
	})(this, document);
	$('#globalNavWrap').hover(function() {
		navMoveWidth = $(this).offset().left + 10;
		navWidth = $(this).offset().left;
		$(this).not(':animated').animate({left: navMoveWidth }, '300');
	}, function() {
		$(this).animate({left: navWidth}, '100');
	});
	$('.subMenu').hover(function() {
		$('> ul:not(:animated)', this).toggle();
	}, function() {
		$('> ul:not(:animated)', this).toggle();
	});
});
$('#topAdvertiseList li').hover(function () {
	$(this).not(':animated').fadeTo(500, 0);
}, function() {
	$(this).fadeTo(300, 1);
});
function setGlobalNavPos() {
	if ($('#contentBox').css('padding-left') == '230px') {
		leftPos = $('#contentBox').offset().left + 230
	} else {
		leftPos = $('#contentBox').offset().left
	}
	if (leftPos < 250) {
		$('#globalNavWrap').animate({left: -760}, {duration: 800});
		$('#contentBox').css('padding-left', '270px');
	} else {
		$('#globalNavWrap').animate({left: leftPos - 1030}, {duration: 800});
		$('#contentBox').css('padding-left', '0px');
	}
	winHeight = $(window).height();
	if (winHeight <= 880 ) {
		$('#globalNavWrap').css('position', 'absolute');
	} else {
		$('#globalNavWrap').css('position', 'fixed');
	}
}