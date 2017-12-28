function MyPolygon(cnt, prevpoly) {
    if(cnt == 0) {
	this.cnt = cnt;
	this.id = "Poly " + cnt;
	this.corslist = [];
	this.color = "#00F";
	this.stroke_color = "#0F0";
	this.stroke_opacity = 0.5;
	this.opacity = 0.5;
	this.stroke_width = "3px";
    } else {
	this.cnt = cnt;
	this.id = "Poly " + cnt;
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
    retval += "Number: " + this.cnt + "\n<br>";
    retval += "ID: " + this.id + "\n<br>";
    retval += "Coordinates: " + this.corslist + "\n<br>";
    retval += "Background color: " + this.color + "\n<br>";
    retval += "Background opacity: " + this.opacity + "\n<br>";
    retval += "Stroke color: " + this.stroke_color + "\n<br>";
    retval += "Stoke opacity: " + this.stroke_opacity + "\n<br>";
    retval += "Stroke width: " + this.stroke_width + "\n<br>";
    return retval;
}
MyPolygon.prototype.entryline = function() {
    var lineid = "Polyline_" + this.cnt;
    var line = '<div id="' +lineid+ '" >';
    line += '<span style="cursor: pointer;" onclick="polyselect(\'' + lineid + '\', \''+this.id+'\', \''+this.cnt+'\')">'
    line += this.id;
    line += '</span>'
    line += '<button type="button" style="margin-left: 1rem; color: red;" onclick="clickfunc(\'' + this.id + '\', ' + this.cnt + ')">&#10006</button>';
    line += "</div>";
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