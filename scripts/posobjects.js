function MyPolygon(cnt) {
    this.cnt = cnt;
    this.id = "poly_" + cnt;
    this.corslist = [];
}
MyPolygon.prototype.addcors = function(cors) {
    console.log("Adding " + cors[0] + " : " + cors[1] + " to curpol.corslist");
    for(i = 0; i < this.corslist.length; i++) {
	console.log("" + i + ". " + this.corslist[i]);
    }
    this.corslist.push(cors);
};
