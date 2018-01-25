function MyColor(fill, stroke, fill_opacity, stroke_opacity) {
    this.fill = fill;
    this.stroke = stroke;
    this.fill_opacity = fill_opacity;
    this.stroke_opacity = stroke_opacity;
}

MyColor.prototype.update_fill = function(colorval, id) {
    var hexredval = parseInt(colorval).toString(16);
    if(hexredval.length < 2)
        hexredval = "0" + hexredval;
    var channel = id.substring(0,1);
    if(channel == "r")
        this.fill = (this.fill.substring(0, 1) + hexredval.substring(0, 2) + this.fill.substring(3)).toUpperCase();
    else if(channel == "g")
        this.fill = (this.fill.substring(0, 3) + hexredval.substring(0, 2) + this.fill.substring(5)).toUpperCase();
    else if(channel == "b")
        this.fill = (this.fill.substring(0, 5) + hexredval.substring(0, 2)).toUpperCase();
    jQuery("#" + channel + "fval").html(colorval);
    jQuery("#fillbox").css("background-color", this.fill);
    update_color(this);
}

MyColor.prototype.update_stroke = function(colorval, id) {
    var hexredval = parseInt(colorval).toString(16);
    if(hexredval.length < 2)
        hexredval = "0" + hexredval;
    var channel = id.substring(0,1);
    if(channel == "r")
        this.stroke = (this.stroke.substring(0, 1) + hexredval.substring(0, 2) + this.stroke.substring(3)).toUpperCase();
    else if(channel == "g")
        this.stroke = (this.stroke.substring(0, 3) + hexredval.substring(0, 2) + this.stroke.substring(5)).toUpperCase();
    else if(channel == "b")
        this.stroke = (this.stroke.substring(0, 5) + hexredval.substring(0, 2)).toUpperCase();
    jQuery("#" + channel + "sval").html(colorval);
    jQuery("#strokebox").css("background-color", this.stroke);
    update_color(this);
}

MyColor.prototype.get_rgb = function(hexcolor) {
    var hrgb = [hexcolor.substring(1, 3), hexcolor.substring(3, 5), hexcolor.substring(5, 7)];
    function hexparse(i) {
        return parseInt(i, 16);
    }
    return hrgb.map(hexparse);
}

MyColor.prototype.get_fill_rgb = function() {
    return this.get_rgb(this.fill);
}

MyColor.prototype.get_stroke_rgb = function() {
    return this.get_rgb(this.stroke);
}

function MyPolygon(cnt, prevpoly, color=(new MyColor("#FF0000", "#0000FF", "0.5", "0.5"))) {
    this.cnt = cnt;
    this.id = "PGN" + padnum("" + cnt, 8);
    this.lineid = "Polyline_" + cnt;
    this.color = color;
    if(cnt == 0) {	
        this.corslist = [];
        this.color = color;
        this.stroke_width = "3px";
    } else {
        this.corslist = [];
        this.color = prevpoly.color;
        this.stroke_width = prevpoly.stroke_width;
    }
}

MyPolygon.prototype.rgba = function(hex, alpha="1") {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

MyPolygon.prototype.get_fill = function() {
    return this.rgba(this.color.fill, this.color.fill_opacity);
}

MyPolygon.prototype.get_stroke = function() {
    return this.rgba(this.color.stroke, this.color.stroke_opacity);
}

MyPolygon.prototype.info = function() {
    var retval = "";
    retval += '<span style="color: black; background-color: white; padding-right: 1em;">Polygon #' + this.cnt + "<br><br></span>\n";
    retval += "ID: " + this.id + "\n<br>";
    retval += "Fill color: " + this.color.fill + '&nbsp<span style="background-color:' +this.color.fill+ ';">&nbsp&nbsp&nbsp</span>'+ "\n<br>";
    retval += "Fill opacity: " + this.color.fill_opacity + "\n<br>";
    retval += "Stroke color: " + this.color.stroke + '&nbsp<span style="background-color:' +this.color.stroke+ ';">&nbsp&nbsp&nbsp</span>'+ "\n<br>";
    retval += "Stroke opacity: " + this.color.stroke_opacity + "\n<br>";
    retval += "Stroke width: " + this.stroke_width + "\n<br>";
    retval += "Coordinates: \n<br>";
    var pad = function padnum(str, len) {
	for(i = str.length; i < len; i++) {
            str = "0" + str;
	}
	return str;
    }
    for(i = 0; i < this.corslist.length; i++) {
	retval += '<span style="border-bottom-style: solid; border-bottom-color: white; border-bottom-width: 1px;">' + i 
	    + '. <span style="color: red;">X</span> ' 
	    + this.corslist[i][0]
	    + ' <span style="color: red;">Y</span> ' 
	    + this.corslist[i][1]
	    + '</span>'
	    + "\n<br>";
    }
    return retval;
}
MyPolygon.prototype.entryline = function() {
    var lineid = "Polyline_" + this.cnt;
    var line = '<span class="' +lineid+ '">';
    line += '<div class="polyentry  ' + lineid +'" ';
    line += 'onclick="polyselect(\'' + lineid + '\', \''+this.id+'\', \''+this.cnt+'\')"';
    line += '>';
    line += this.id;
    line += "</div>";
    line += '<div class="polyremovebutton"'
	+ 'onclick="clickfunc(\'' 
	+ this.id 
	+ '\', ' 
	+ this.cnt 
	+ ')">'  // Button open tag
	+ '<span style="vertical-align: middle; display: inline-block;">&#10006</span>' // Button label
	+ '</div>'; // Button end tag
    line += '</span><br>';
    return line;
}

MyPolygon.prototype.addcors = function(cors) {
    this.corslist.push(cors);
}

MyPolygon.prototype.setid = function(cnt) {
    this.cnt = cnt;
    this.id = "Poly " + cnt;
}

MyPolygon.prototype.closed_path = function() {
    if(typeof this.corslist != 'undefined' && this.corslist.length > 1) {
	var firstcor = this.corslist[0];
	var lastcor = this.corslist[this.corslist.length - 1];
	if(firstcor[0] == lastcor[0] && firstcor[1] == lastcor[1])
	    return true;
	else
	    return false;
    } else {
	return false;
    }
}