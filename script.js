$('#headline').on('input', function(event) {
	$('h1, span.bold').text($(this).val());
});
$('#image').on('keyup', function(event) {
	$('img').attr('src', $(this).val());
});
$('#text').on('keyup', function(event) {
	$('.regular').text($(this).val());
});
$('#headlineChange').on("change", function() {
	var em = $(this).val();
	$('h1').css({
		"font-size": em + 'em'
	});
});
$('#stretch').on('click', function() {
	$('.imgWrapper img').toggleClass('stretchImg');
});

function updateValues() {
	$('h1, span.bold').text($('#headline').val());
	$('img').attr('src', $('#image').val());
	$('.regular').text($('#text').val());
	var em = $('#headlineChange').val();
	$('h1').css({
		"font-size": em + 'em'
	});
}

$('button').on('click', function() {
	URLencoder();
	$('#editor, button').remove();
	$('#wrapper').addClass('save');
	$('.imgWrapper').addClass('imgSave');
	$('#share').show();
	$('p.center').show();
});

function updateURL() {
	var title = $('#headline').val(),
		range = (parseFloat($('#headlineChange').val()) - 0.4).toFixed(1),
		text = $('#text').val(),
		image = $('#image').val();
	console.log(title, range, text, image);
	window.location.hash = title + "#" + range + "#" + text.replace("%", "%25") + "#" + image;
}

function URLencoder() {
	updateURL();
	var base = "http://mini.s-shot.ru/570x250/PNG/800/Z100/?",
		link = base + encodeURIComponent(window.location.href);
	console.log(link);
	$.ajax({
		url: 'https://api.imgur.com/3/image',
		headers: {
			'Authorization': 'Client-ID d7d832e66eb8ea2'
		},
		type: 'POST',
		data: {
			'image': link
		},
		success: function(result) {
			var imgLink = result.data.link;
			console.log(imgLink);
			$('#share').val(imgLink);
			var link = document.createElement('a');
			link.href = imgLink;
			link.download = $('h1').text() + '.png';
			document.body.appendChild(link);
			link.click();
			window.location.hash = '';
		}
	});
}

function URLdecoder() {
	var hash = window.location.hash.split('#');
	if (hash.length > 1) {
		var title = decodeURIComponent(hash[1]),
			range = decodeURIComponent(hash[2]),
			text = decodeURIComponent(hash[3]),
			image = hash[4];
		console.log(title, range, text, image);
		$('#headline').val(title);
		$('#headlineChange').val(parseFloat(range));
		$('#text').val(text);
		$('#image').val(image);
		updateValues();
	}
}

URLdecoder();
