var ns = 'http://www.w3.org/2000/svg';
var snapmul = 10;
var clicknum = 0;
var lcor = [0, 0];
var pcor = [0, 0];
var ppos;
var x, y;
var drawing;
var dotid = "dot";
var curpol = null;
var parr = [];

jQuery(document).on("keydown", function(e) { 
    // UNDO
    if((e.metaKey && !e.ctrlKey && e.which == 90) || (e.ctrlKey && e.which == 90)) {
	drawing = undo_svg("picturebox", drawing, parr[parr.length - 1]);
	if(clicknum > 0) {
	    clicknum--;
	    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
	}
    }
    // REMOVE POLYGON WITH HOTKEY "D"
    if(e.which == 68) {
	parr = remove_polygon(parr);
	clicknum = 0;
	jQuery("#clicked_num").text(padnum("" + clicknum, 4));
    }
});

jQuery(document).on( "mousemove", function(event) {
    coordinates(event);
});

function coordinates(event) {
    pcor = lcor.slice();
    lcor = mcors();
    var x = lcor[0];
    var y = lcor[1];
    if(pcor != lcor) {
	var strx = "" + x;
	var stry = "" + y;
	if(y < 0 || y > jQuery("#picturebox").height() || x < 0 || x > jQuery("#picturebox").width()) {
	    stry = "0000";
	    strx = "0000";
	}
	jQuery("#mouse_y").text(padnum(stry, 4));
	jQuery("#mouse_x").text(padnum(strx, 4));
	draw_dot(mcors(), "picturebox", dotid, drawing);
    }
}

jQuery(document).ready(function() {
    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
    ppos = update_ppos();
    drawing = init_svg("picturebox");

    jQuery("#picturebox").on('click tap', function(event) {
	coordinates(event);
	if(clicknum == 0) {
	    curpol = new MyPolygon(parr.length);
	    parr.push(curpol);
	}
	clicknum++;
	curpol.addcors(mcors());
	if(clicknum > 0) {
            draw_lines("picturebox", drawing, parr[parr.length - 1]);
	}
	if(curpol.closed_path()) {
	    // DO CLOSED PATH STUFF
	    update_polygon_list(parr);
	    clicknum = 0;
	}
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
