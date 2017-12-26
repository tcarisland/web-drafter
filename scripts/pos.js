var ns = 'http://www.w3.org/2000/svg';
var snapmul = 10;
var clicknum = 0;
var lcor = [0, 0];
var pcor = [0, 0];
var ppos;
var x, y;
var drawing;
var dotid = "dot";
var curpol = new MyPolygon();
var parr = [curpol];

$(document).on("keydown", function(e) { 
    if((e.metaKey && !e.ctrlKey && e.which == 90) || (e.ctrlKey && e.which == 90)) 
	drawing = undo_svg("picturebox", drawing, parr[parr.length - 1]);
    if(e.which == 68) {
	remove_polygon(parr[parr.length - 1], "picturebox");
	curpol.corslist = [];
    }
});

$(document).on( "mousemove", function(event) {
    pcor = lcor.slice();
    lcor = mcors();
    var x = lcor[0];
    var y = lcor[1];
    if(pcor != lcor) {
	var strx = "" + x;
	var stry = "" + y;
	if(stry < 0 || stry > $("#picturebox").height() || strx < 0 || strx > $("#picturebox").width()) {
	    stry = 0;
	    strx = 0;
	}
	$("#mouse_y").text(padnum("" + stry, 4));
	$("#mouse_x").text(padnum("" + strx, 4));
	draw_dot(mcors(), "picturebox", dotid, drawing);
    }
});

$(document).ready(function() {
    $("#clicked_num").text(padnum("" + clicknum, 4));
    ppos = update_ppos();
    drawing = init_svg("picturebox");

    $("#picturebox").click(function() {
	var strclk = padnum("" + clicknum, 4);
	$("#clicked_num").text(strclk);
	curpol.addcors(mcors());
	if(clicknum > 0) {
            draw_lines("picturebox", drawing, parr[parr.length - 1]);
	}
	clicknum++;
    });
});

$(window).resize(function() {
    ppos = update_ppos();
});

$('body').flowtype({
    fontRatio : 30
});
