function draw_lines(divname, draw, poly) {
    var polyid = poly.id;
    var cors = poly.corslist;
    var pline = SVG.get(polyid)
    if(pline)
	pline.replace(draw.polyline(cors).id(polyid)).stroke({ color: '#000', opacity: 0.9, width: 1 }).fill({color: '#AAA', opacity: 0.3});
    else
	draw.polyline(cors).id(polyid).stroke({ color: '#000', opacity: 0.9, width: 1 }).fill({color: '#AAA', opacity: 0.3});
    return draw;
}

function update_polygon_list(polyarr) {
    jQuery("#polylist").empty();
    if(polyarr.length > 0) {
	for(i = polyarr.length - 1; i >= 0; i--) {
	    jQuery("#polylist").append(polyarr[i].id + "<br>");
	}
    }
}

function remove_polygon(polyarr) {
    if(polyarr.length > 0) {
	var poly = polyarr.pop();
	var polyid = poly.id;
	var p = SVG.get(polyid);
	if(p)
	    p.remove();
	update_polygon_list(polyarr);
    }
    return polyarr;
}

function init_svg(divname) {
    console.log("emptying " + divname + " before init_svg");
    jQuery("#" + divname).empty();
    var draw = SVG(divname);
    return draw;
}

function draw_dot(cors, divname, dotid, draw) {
    if(draw) {
	var dot = SVG.get(dotid);
	if(dot)
	    dot.remove();
	var rect = draw.rect(5,5).stroke({ color: '#000', opacity: 0.9, width: 1 }).fill({color: '#AAA', opacity: 0.3});
	rect.id(dotid);
	rect.center(cors[0], cors[1]);
	rect.rotate(45);
    }
}

function undo_svg(divname, draw, poly) {
    var polyid = poly.id;
    var cors = poly.corslist;
    cors.pop();
    return draw_lines(divname, draw, poly);
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

function rundav(num, mul) {
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
    return [rundav(rval[0], snapmul), rundav(rval[1], snapmul)];
}
