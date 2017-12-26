function draw_lines(cors, divname, draw, polyid) {
    var pline = SVG.get(polyid)
    if(pline)
	pline.replace(draw.polyline(cors).id(polyid)).stroke({ color: '#000', opacity: 0.9, width: 1 }).fill({color: '#AAA', opacity: 0.3});
    else
	draw.polyline(cors).id(polyid).stroke({ color: '#000', opacity: 0.9, width: 1 }).fill({color: '#AAA', opacity: 0.3});
    return draw;
}

function remove_polygon(polyid, divname) {
    var p = SVG.get(polyid);
    if(p)
	p.remove();
}

function init_svg(divname) {
    $("#" + divname).empty();
    var draw = SVG(divname);
    return draw;
}

function draw_dot(cors, divname, dotid, draw) {
    var circle = draw.circle(5);
    circle.attr('x', cors[0]);
    circle.attr('y', cors[1]);
}

function undo_svg(cors, divname, draw, polyid) {
    cors.pop();
    return draw_lines(cors, divname, draw, polyid);
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
    return [a, b, c, d];
}

function rundav(num, mul) {
    if(num != 0)
	return Math.round(num/mul) * mul;
    else
	return 0;
}


function mcors() {
    var stry = rundav(event.pageY - $("#picturebox").offset().top, snapmul);
    var strx = rundav(event.pageX - $("#picturebox").offset().left, snapmul);
    return [strx, stry];
}
