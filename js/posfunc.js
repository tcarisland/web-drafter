function enable_overlay() {
    if(jQuery("#overlay").css('display') == 'none') {
	jQuery("#overlay").fadeIn("slow", function() {});
	jQuery("#overlay").append('<div id="overlayexitbutton">&#10006</div>');
	jQuery("#overlayexitbutton").on('click', function() {
	    disable_overlay();
	});
    }
}

function disable_overlay() {
  if(jQuery("#overlay").css('display') != 'none') { 
    jQuery("#overlay").empty();
    jQuery("#overlay").fadeOut("slow", function(){});
  }
}

function dialog_box(data) {
    if(document.getElementById("dialog") === null) {
	jQuery("#overlay").append('<div id="dialog" class="colorpickerdialog">' + data + "</div>");
    }
}

function color_selector_form(color) {
    frgb = color.get_fill_rgb();
    srgb = color.get_stroke_rgb();

    var red_slider = "<input class='fill_slider' id='red_slider' value="+frgb[0]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='rfval' >"+frgb[0]+"</div><br> ";
    var green_slider = "<input class='fill_slider' id='green_slider' value="+frgb[1]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='gfval' >"+frgb[1]+"</div><br>";
    var blue_slider = "<input class='fill_slider' id='blue_slider' value="+frgb[2]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='bfval' >"+frgb[2]+"</div><br>";
    var fcbox = "<span id=\"fillbox\" style=\"background-color: "+color.fill+"; display: block; height: 50px; width: 50px;\">&nbsp</span>";

    var red_stroke_slider = "<input class='stroke_slider' id='red_stroke_slider' value="+srgb[0]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='rsval' >"+srgb[0]+"</div><br> ";
    var green_stroke_slider = "<input class='stroke_slider' id='green_stroke_slider' value="+srgb[1]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='gsval' >"+srgb[1]+"</div><br>";
    var blue_stroke_slider = "<input class='stroke_slider' id='blue_stroke_slider' value="+srgb[2]+" type=\"range\" min=\"0\" max=\"255\"> <br> <div id='bsval' >"+srgb[2]+"</div><br>";
    var scbox = "<span id=\"strokebox\" style=\"background-color: "+color.stroke+"; display: block; height: 50px; width: 50px;\">&nbsp</span>";

    var retval = "<table><tr><td>Fill<br><br>";
    retval += "Red: <br>" + red_slider + "Green: <br>" + green_slider + "Blue: <br>" + blue_slider + "<br>" + fcbox;
    retval += "</td><td>&nbsp&nbsp&nbsp</td><td>Stroke<br><br>";
    retval += "Red: <br>" + red_stroke_slider + "Green: <br>" + green_stroke_slider + "Blue: <br>" + blue_stroke_slider + "<br>" + scbox;
    retval += "</td></tr></table>";
    return retval;
}

function draw_lines(divname, draw, poly) {
    var pline = SVG.get(poly.id)
    var npline = draw.polyline(poly.corslist);
    npline = npline.id(poly.id);
    npline = npline.stroke({ color: poly.color.stroke, opacity: poly.color.stroke_opacity, width: poly.stroke_width });
    npline = npline.fill({color: poly.color.fill, opacity: poly.color.fill_opacity})
    if(pline) {
	pline.replace(npline);
    }
    return draw;
}

function update_polygon_list(polyarr) {
    jQuery("#polylist").empty();
    if(typeof polyarr != 'undefined') {
	if(polyarr.length > 0) {
	    for(i = polyarr.length - 1; i >= 0; i--) {
		if(typeof polyarr[i] != 'undefined' && polyarr[i] != null)
		    jQuery("#polylist").append(polyarr[i].entryline() + "<br>");
	    }
	}
    }
}

function clickfunc(polyid, num) {
    //alert("Hello \nPolyID: " + polyid + "\nNum: " + num);
    if(confirm("Delete polygon: " + polyid)) {
	var p = SVG.get(polyid);
	if(typeof p != "undefined" && p != null) {
	    p.remove();
	}
	delete parr[num];
	update_polygon_list(parr);
    }
}

function polyselect(lineid, polyid, num) {
    if(typeof selected != 'undefined' && selected != null) {
        jQuery("." + selected.lineid).val("unselected");
        jQuery("." + selected.lineid).css("background-color", "transparent");
        jQuery("." + selected.lineid).css("color", "white");
    }
    if(jQuery("." + lineid).val() == "selected") {
        selected = null;
        jQuery("." + lineid).val("unselected");
        jQuery("." + lineid).css("background-color", "transparent");
        jQuery("." + lineid).css("color", "white");
    } else {
        selected = parr[num];
        jQuery("." + lineid).css("background-color", "white");
        jQuery("." + lineid).css("color", "black");
        jQuery("." + lineid).val("selected");
    }
}

function update_color(color, stroke_width) {
    var rgba_fill = color.fill;
    var rgba_stroke = color.stroke;
    //console.log(rgba_fill + " " + rgba_stroke);
    jQuery(".colorpicker").css("background-color", rgba_fill);
    update_border_color(".colorpicker", rgba_stroke);
    update_border_width(".colorpicker", stroke_width);
    update_border_style(".colorpicker", "solid");
}

function update_border_style(divname, style) {
    jQuery(divname).css("border-top-style", style);
    jQuery(divname).css("border-left-style", style);
    jQuery(divname).css("border-right-style", style);
    jQuery(divname).css("border-bottom-style", style);
}

function update_border_color(divname, color) {
    jQuery(divname).css("border-top-color", color);
    jQuery(divname).css("border-left-color", color);
    jQuery(divname).css("border-bottom-color", color);
    jQuery(divname).css("border-right-color", color);
}

function update_border_width(divname, color) {
    jQuery(divname).css("border-top-width", color);
    jQuery(divname).css("border-left-width", color);
    jQuery(divname).css("border-bottom-width", color);
    jQuery(divname).css("border-right-width", color);
}

function update_clicked_num(clicknum) {
    jQuery("#clicked_num").text(padnum("" + clicknum, 4));
}

function remove_polygon(polyarr) {
    if(polyarr.length > 0) {	
	var poly = polyarr.pop();
	if(typeof poly != "undefined" && poly != null) {
	var polyid = poly.id;
	var p = SVG.get(polyid);
	if(p)
	    p.remove();
	}
	update_polygon_list(polyarr);
    }
    return polyarr;
}

function init_svg(divname) {
    jQuery("#" + divname).empty();
    var draw = SVG(divname);
    return draw;
}

function draw_dot(cors, divname, dotid, draw) {
    if(draw) {
	var dot = SVG.get(dotid);
	if(dot)
	    dot.remove();
	var rect = draw.rect(5,5).stroke({ color: '#000', width: 1 }).fill({color: '#FFF', opacity: 0.3});
	rect.id(dotid);
	rect.center(cors[0], cors[1]);
	rect.rotate(45);
    }
}

function undo_svg(divname, draw, polyarr, clicknum) {
    if(clicknum > 0) {
        curpol.corslist.pop();
        return draw_lines(divname, draw, curpol);
    } else {
	if(polyarr.length > 0) {
	    remove_polygon(polyarr);
	}
	return draw;
    }
}

function update_ppos(ppos) {
    ppos = get_corners("#picturebox");
    jQuery("#svg_a").text("" + ppos[0]);
    jQuery("#svg_b").text("" + ppos[1]);
    jQuery("#svg_c").text("" + ppos[2]);
    jQuery("#svg_d").text("" + ppos[3]);
    jQuery('body').flowtype({});
    return ppos;
}

function padnum(str, len) {
    for(i = str.length; i < len; i++) {
	str = "0" + str;
    }
    return str;
}

function get_corners(divname) {
    var divpos = jQuery(divname).offset();
    var a = [divpos.left, divpos.top];
    var b = [divpos.left + jQuery(divname).width(), divpos.top];
    var c = [divpos.left, divpos.top + jQuery(divname).height()];
    var d = [divpos.left + jQuery(divname).width(), divpos.top + jQuery(divname).height()];
    var dpos = [a, b, c, d];
    for(i = 0; i < dpos.length; i++) {
	for(q = 0; q < dpos[i].length; q++) {
	    dpos[i][q] = Math.round(dpos[i][q]);
	}
    }
    return dpos;
}

function roundnum(num, mul) {
    if(num != 0)
	return Math.round(num/mul) * mul;
    else
	return 0;
}

function getcors() {
    var cx = event.pageY - jQuery("#picturebox").offset().top;
    var cy = event.pageX - jQuery("#picturebox").offset().left;
    return [cy, cx];
}

function mcors() {
    var rval = getcors();
    return [roundnum(rval[0], snapmul), roundnum(rval[1], snapmul)];
}

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