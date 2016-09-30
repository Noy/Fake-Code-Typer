$(document).ready(function() {
	$(document).keydown(function(e) {
		code.addText(e);
	});
});

var code = {
	text: null, accessCountimer: null, index: 0, speed: 2, file: "",
	start: function() {
		accessCountimer = setInterval(function() {
			code.blinkingLine();
		}, 500);
		$.get(code.file, function(data){
			code.text = data;
		});
	},
	
	page: function() { return $("#console").html(); },
	
	type: function(string) {
		$("#console").append(string);
		return false;
	},
	
	addText: function(textBody){
	 	if (code.text) {
			var p = code.page();
			if (p.substring(p.length - 1, p.length) =="|") $("#console").html($("#console").html().substring(0, p.length - 1));
			if (textBody.keyCode != 8) { 
				code.index += code.speed;
			} else { 
				if (code.index > 0) code.index -= code.speed;
			}
			var text = $("<div/>").text(code.text.substring(0, code.index)).html();
			var newLine = new RegExp("\n", "g"); 
			var whiteSpace = new RegExp("\\s", "g");
			var tab = new RegExp("\\t", "g");
			$("#console").html(text.replace(newLine, "<br/>").replace(tab, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(whiteSpace, "&nbsp;"));
			window.scrollBy(0, 50);
		}
		if (textBody.preventDefault && textBody.keyCode != 122 ) textBody.preventDefault();
		if (textBody.keyCode != 122)textBody.returnValue = false;
	},
	
	blinkingLine: function() {
		var p = this.page();
		if (p.substring(p.length -1 , p.length) =="|") $("#console").html($("#console").html().substring(0, p.length-1));
		else this.type("|");
	}
}