$(window).on('scroll', function () {
	let pageHeight = $('body').height(),
		scrollTop = $(window).scrollTop(),
		winHeight = $(window).height(),
		thresold = pageHeight - scrollTop - winHeight;
	if (thresold > - 100 && thresold <= 20) {
		console.log('end');
	}
});

function throttle(fn, interval = 300) {
	let canRun = true;
	return function () {
		if (!canRun) return;
		canRun = false;
		setTimeout(() => {
			fn.apply(this, arguments);
			canRun = true;
		}, interval);
	};
}


$('input.user-name').on('input', function () {
	$.ajax({
		url: `https://just.com/check`,
		method: 'post',
		data: { username: $(this).val(), },
		success(data) {
			if (data.isRegistered) {
				$('.tips').text('该用户名已被注册！');
			} else {
				$('.tips').text('恭喜！该用户名还未被注册！');
			}
		},
		error(error) { console.log(error); },
	});
});

$('input.user-name').on('input', debounce(function () {
	$.ajax({
		url: `https://just.com/check`,
		method: 'post',
		data: { username: $(this).val(), }, success(data) {
			if (data.isRegistered) {
				$('.tips').text('该用户名已被注册！'
				);
			} else { $('.tips').text('恭喜！该用户名还未被注册！'); }
		},
		error(error) { console.log(error); },
	});
}));

function debounce(fn, interval = 300) {
	let timeout = null;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn.apply(this, arguments);
		}, interval);
	};
}