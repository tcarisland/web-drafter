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

function remove_polygon(poly, divname) {
    var polyid = poly.id;
    var p = SVG.get(polyid);
    if(p)
	p.remove();
}

function init_svg(divname) {
    console.log("emptying " + divname + " before init_svg");
    $("#" + divname).empty();
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
    $("#svg_a").text("" + ppos[0]);
    $("#svg_b").text("" + ppos[1]);
    $("#svg_c").text("" + ppos[2]);
    $("#svg_d").text("" + ppos[3]);
    $('body').flowtype({});
    return ppos;
}

function padnum(str, len) {
    for(i = str.length; i < len; i++) {
	str = "0" + str;
    }
    return str;
}

function get_corners(divname) {
    var divpos = $(divname).offset();
    var a = [divpos.left, divpos.top];
    var b = [divpos.left + $(divname).width(), divpos.top];
    var c = [divpos.left, divpos.top + $(divname).height()];
    var d = [divpos.left + $(divname).width(), divpos.top + $(divname).height()];
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
    var cx = event.pageY - $("#picturebox").offset().top;
    var cy = event.pageX - $("#picturebox").offset().left;
    return [cy, cx];
}

function mcors() {
    var rval = getcors();
    return [rundav(rval[0], snapmul), rundav(rval[1], snapmul)];
}
