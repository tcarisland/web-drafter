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
var selected = null;
var parr = [];

jQuery(document).on("keydown", function(e) { 
    // UNDO
    if((e.metaKey && !e.ctrlKey && e.which == 90) || (e.ctrlKey && e.which == 90)) {
	console.log("undo");
	drawing = undo_svg("picturebox", drawing, parr, clicknum);
	if(clicknum > 0) {
	    clicknum--;
	    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
	}
    }
    // REMOVE POLYGON WITH HOTKEY "D"
    if(e.which == 68) {
	parr = remove_polygon(parr);
	clicknum = 0;
	update_clicked_num(clicknum);
    }
    // ESC 27
    if(e.which == 27) {
	jQuery("#overlay").empty();
	jQuery("#overlay").fadeOut("slow", function(){});
    }
    // S 83
    if(e.which == 83) {
	if(jQuery("#overlay").css('display') == 'none') {
	    enable_overlay();
	    if(selected == null) {
		dialog_box("No polygon selected");
	    } else {
		dialog_box(selected.info());
	    }

	} else {
	    disable_overlay();
	}
    }
});

jQuery(document).on( "mousemove", function(event) {
    coordinates(event);
});

jQuery(document).ready(function() {
    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
    ppos = update_ppos();
    drawing = init_svg("picturebox");
    jQuery('.colorpicker').on('click', function(event) {
	enable_overlay();
    });

    jQuery("#picturebox").on('click', function(event) {
	coordinates(event);
	if(clicknum == 0) {
	    if(parr.length > 0) {
		curpol = new MyPolygon(parr.length, curpol);
	    } else {
		curpol = new MyPolygon(0, null);
	    }
	    update_color(curpol);
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

