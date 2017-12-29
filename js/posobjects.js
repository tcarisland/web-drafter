function MyPolygon(cnt, prevpoly) {
    this.cnt = cnt;
    this.id = "PGN" + padnum("" + cnt, 8);
    this.lineid = "Polyline_" + cnt;
    if(cnt == 0) {	
	this.corslist = [];
	this.color = "#00F";
	this.stroke_color = "#0F0";
	this.stroke_opacity = 0.5;
	this.opacity = 0.5;
	this.stroke_width = "3px";
    } else {
	this.corslist = [];
	this.color = prevpoly.color;
	this.stroke_color = prevpoly.stroke_color;
	this.stroke_opacity = prevpoly.stroke_opacity;
	this.opacity = prevpoly.opacity;
	this.stroke_width = prevpoly.stroke_width;
    }
}
MyPolygon.prototype.info = function() {
    var retval = "";
    retval += '<span style="color: black; background-color: white; padding-right: 1em;">Polygon #' + this.cnt + "<br></span>\n";
    retval += "ID: " + this.id + "\n<br>";
    retval += "Background color: " + this.color + "\n<br>";
    retval += "Background opacity: " + this.opacity + "\n<br>";
    retval += "Stroke color: " + this.stroke_color + "\n<br>";
    retval += "Stoke opacity: " + this.stroke_opacity + "\n<br>";
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