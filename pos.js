var ns = 'http://www.w3.org/2000/svg';
var snapmul = 10;
var clicknum = 0;
var lcor = [0, 0];
var pcor = [0, 0];
var corslist = [];
var ppos;
var x, y;
var drawing;
var dotid = null;
var polyid = "my_polygon";

$(document).on("keydown", function(e) { 
    if((e.metaKey && !e.ctrlKey && e.which == 90) || (e.ctrlKey && e.which == 90)) 
	drawing = undo_svg(corslist, "picturebox", drawing, polyid);
    if(e.which == 68) {
	remove_polygon(polyid, "picturebox");
	corslist = [];
    }
});

$(document).on( "mousemove", function(event) {
    pcor = lcor.slice();
    lcor = mcors();
    var x = rundav(lcor[0], 10);    
    var y = rundav(lcor[1], 10);
    if(pcor != lcor) {
	var strx = "" + x;
	var stry = "" + y;
	if(stry < 0 || stry > $("#picturebox").height() || strx < 0 || strx > $("#picturebox").width()) {
	    stry = 0;
	    strx = 0;
	}
	$("#mouse_y").text(padnum(""+stry, 4));
	$("#mouse_x").text(padnum(""+strx, 4));
    }
});

$(document).on("click", function(event) {
    var strclk = padnum("" + clicknum, 4);
    $("#clicked_num").text(strclk);
    corslist.push(mcors());
    if(clicknum > 1) {
	draw_lines(corslist, "picturebox", drawing, polyid);
    }
    clicknum++;
});

$(document).ready(function() {
    $("#clicked_num").text(padnum("" + clicknum, 4));
    ppos = update_ppos();
    drawing = init_svg("picturebox");
});

$(window).resize(function() {
    ppos = update_ppos();
});

$('body').flowtype({
    fontRatio : 30
});
