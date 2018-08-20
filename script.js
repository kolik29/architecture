let munObjData = {
	'Лисестровское': {
		'Школа №123': {
			lat: 64.527568,
			lon: 40.592470,
			rad: 30
		},
		'Детский сад "Мотылёк"': {
			lat: 64.542755,
			lon: 40.521295,
			rad: 30
		},
		'Библиотека №96': {
			lat: 64.541305,
			lon: 40.532410,
			rad: 30
		}
	},

	'Катунинское': {
		'Детский сад "Гена и Чебуршка"': {
			lat: 64.538933,
			lon: 40.556308,
			rad: 30
		},
		'Школа №44': {
			lat: 64.536162,
			lon: 40.579782,
			rad: 30
		}
	},

	'Боброво-Лявленское': {
		'Школа №23': {
			lat: 64.527347,
			lon: 40.611677,
			rad: 30
		},
		'Школа №24': {
			lat: 64.550830,
			lon: 40.565754,
			rad: 30
		},
		'Школа №89': {
			lat: 64.579068,
			lon: 40.522563,
			rad: 30
		},
		'Детский сад №5': {
			lat: 64.570139,
			lon: 40.576207,
			rad: 30
		},
		'Библиотека №9': {
			lat: 64.518222,
			lon: 40.507382,
			rad: 30
		}
	}
}

let html = '';

for(key in munObjData) {
	html += '<li>' + key + '</li>';
}

$('#munForm').children('ul').html(html);

$('.selectElement').on('click', function() {
	if ($(this).hasClass('roll')) {
		$(this).children('ul').css({
			display: 'inline-block'
		});

		$(this).children('.valueText').children('img').css({
			transform: 'rotate(180deg)'
		});

		$(this).removeClass('roll');
	} else {
		$(this).children('ul').css({
			display: 'none'
		});

		$(this).children('.valueText').children('img').css({
			transform: 'rotate(0deg)'
		});

		$(this).addClass('roll');
	}
});

$('.selectElement').on('click', 'li', function() {
	$(this).parent().parent().children('.valueText').children('span').text($(this).text());

	if ($(this).parent().parent().attr('id') == 'munForm') {
		$('#munObj').children('.valueText').children('span').text('Выберите объект');

		html = '';
		for (key in munObjData[$(this).text()]) {
			html += '<li data-coord="[['
			 + munObjData[$(this).text()][key].lat + ', '
			 + munObjData[$(this).text()][key].lon + '], '
			 + munObjData[$(this).text()][key].rad + ']">' + key + '</li>';
		}

		$('#munObj').children('ul').html(html);
	} else {
		console.log($(this).data('coord')[0][0]);
		munObjGeo.geometry.setCoordinates($(this).data('coord')[0]);
		myMap.setCenter($(this).data('coord')[0], 18, {
    		checkZoomRange: true
		});
	}
});

$(document).on('click', function(e) {
	if ((!$('.selectElement').is(e.target)) && ($('.selectElement').has(e.target).length === 0)) {
		$('.selectElement').children('ul').css({
			display: 'none'
		});

		$('.selectElement').children('.valueText').children('img').css({
			transform: 'rotate(0deg)'
		});
	}
});

ymaps.ready(init);

var munObjGeo;
var myMap;

function init() {
	munObjGeo = new ymaps.Circle([[64.527568, 40.592470], 30], { }, {
           	fillColor: "#DB709377",
       		strokeColor: "#990066",
       		strokeOpacity: 0.8,
       		strokeWidth: 2
       	});

    myMap = new ymaps.Map("map", {
            center: [64.543235, 40.537195],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        });

    myMap.geoObjects
       	.add(munObjGeo);
}