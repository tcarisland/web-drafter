var ns = 'http://www.w3.org/2000/svg';
var snapmul = 10;
var clicknum = 0;
var lcor = [0, 0];
var pcor = [0, 0];
var ppos;
var x, y;
var drawing;
var dotid = "dot";
var curpol = new MyPolygon(1);
var parr = [curpol];

jQuery(document).on("keydown", function(e) { 
    if((e.metaKey && !e.ctrlKey && e.which == 90) || (e.ctrlKey && e.which == 90)) 
	drawing = undo_svg("picturebox", drawing, parr[parr.length - 1]);
    if(e.which == 68) {
	remove_polygon(parr[parr.length - 1], "picturebox");
	curpol.corslist = [];
    }
});

jQuery(document).on( "mousemove", function(event) {
    pcor = lcor.slice();
    lcor = mcors();
    var x = lcor[0];
    var y = lcor[1];
    if(pcor != lcor) {
	var strx = "" + x;
	var stry = "" + y;
	if(stry < 0 || stry > jQuery("#picturebox").height() || strx < 0 || strx > jQuery("#picturebox").width()) {
	    stry = 0;
	    strx = 0;
	}
	jQuery("#mouse_y").text(padnum("" + stry, 4));
	jQuery("#mouse_x").text(padnum("" + strx, 4));
	draw_dot(mcors(), "picturebox", dotid, drawing);
    }
});

jQuery(document).ready(function() {
    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
    ppos = update_ppos();
    drawing = init_svg("picturebox");

    jQuery("#picturebox").click(function() {
	curpol.addcors(mcors());
	if(clicknum > 0) {
            draw_lines("picturebox", drawing, parr[parr.length - 1]);
	}
	if(curpol.closed_path()) {
	    // DO CLOSED PATH STUFF
	    console.log("curpol " + curpol.id);
	    curpol = new MyPolygon(++curpol.cnt);
	    parr.push(curpol);
	    jQuery("#polylist").empty();
	    for(i = 0; i < parr.length - 1; i++) {
		jQuery("#polylist").append("" + parr[i].id + "<br>");		
	    }

	}
	clicknum++;
	var strclk = padnum("" + clicknum, 4);
	jQuery("#clicked_num").text(strclk);
    });
});

jQuery(window).resize(function() {
    ppos = update_ppos();
});

jQuery('body').flowtype({
    fontRatio : 30
});

jQuery('#polylist').flowtype({
    fontRatio : 70
});