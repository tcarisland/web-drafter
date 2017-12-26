function MyPolygon(cnt) {
    this.cnt = cnt;
    this.id = "poly_" + cnt;
    this.corslist = [];
}
MyPolygon.prototype.addcors = function(cors) {
    console.log("Adding " + cors[0] + " : " + cors[1] + " to curpol.corslist");
    /*
    for(i = 0; i < this.corslist.length; i++) {
	console.log("" + i + ". " + this.corslist[i]);
    }
    */
    this.corslist.push(cors);
}
MyPolygon.prototype.closed_path = function() {
    if(typeof this.corslist != 'undefined' && this.corslist.length > 1) {
	//console.log("Corslist length " + this.corslist.length);
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