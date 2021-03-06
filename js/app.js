/**
 * Author: rjasonroberts on 4/9/16
 * www.icodepixels.com
 */
$(function() {

	function getRGBValue(){
		var hex = rgbToHex($('#rgbValue').val().replace(/ /g,''));
	}

	function getHexValue() {
		var hexValue = $('#hexValue').val().replace(/ /g,'');
		if(hexValue === "")
			return false;
		else
			return hexToRgb(hexValue)
	}

	function hexToRgb(hexValue) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hexValue = hexValue.replace(shorthandRegex, function(m, r, g, b) {
			return '#' + r + r + g + g + b + b;
		});

		/**
		 *** var result regex expression:
		 ^ assert position at start of the string
		 #? matches the character # literally

		 1st Capturing group ([a-f\d]{2})
		 [a-f\d]{2} match a single character present in the list below
		 Quantifier: {2} Exactly 2 times
		 a-f a single character in the range between a and f (case insensitive)
		 \d match a digit [0-9]
		 2nd Capturing group ([a-f\d]{2})
		 [a-f\d]{2} match a single character present in the list below
		 Quantifier: {2} Exactly 2 times
		 a-f a single character in the range between a and f (case insensitive)
		 \d match a digit [0-9]
		 3rd Capturing group ([a-f\d]{2})
		 [a-f\d]{2} match a single character present in the list below
		 Quantifier: {2} Exactly 2 times
		 a-f a single character in the range between a and f (case insensitive)
		 \d match a digit [0-9]
		 $ assert position at end of the string
		 i modifier: insensitive. Case insensitive match (ignores case of [a-zA-Z])
		*/
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);

		if(result === null){
			return false;
		} else{
			var red = parseInt(result[1], 16),
				green = parseInt(result[2], 16),
				blue = parseInt(result[3], 16);

			this.newConversion = $('<div>')
				.html("<span class='hex'>" + hexValue + "</span> = " + "<span class='rgb'>rgb(" + red + "," + green + "," + blue + ")</span>")
				.appendTo($('.hexResults'));

			applyColor(hexValue);
		}
	}

	function rgbToHex(rgb){
		rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		var hex = (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';

		this.newConversion = $('<div>')
			.html("<span class='hex'>" + hex + "</span>" + " = " + "<span class='rgb'>" + rgb.input + "</span>")
			.appendTo($('.rgbResult'));

		applyColor(hex);
	}

	function applyColor(hexValue){
		this.newConversion.css( "background-color", hexValue );
		if(hexValue.slice(0,4) === '#fff' || hexValue.slice(0,4) === '#eee'){
			this.newConversion.css( "color", "#333" );
		}
	}

	$('#rgbconvert').on("click", getRGBValue);
	$( "#hexconvert" ).on( "click", getHexValue );
});