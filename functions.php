<?php

function get_html() {
	 $retval = "<!DOCTYPE html>";
	 $retval .= get_header();
	 $retval .= get_body();
	 $retval .= "</html>";
	 return $retval;
}

function get_body() {
	 $retval = "";
	 $retval .= get_databox();
	 $retval .= get_html_breaks(5);
	 $retval .= '<div id="picturebox" class="box"> </div>';
	 $retval .= get_menu();

	 return $retval;
}

function get_menu() {
	 return file_get_contents("templates/menu.html");
}

function get_header() {
	 return file_get_contents("templates/header.html");
}

function get_databox() {
	 return file_get_contents("templates/databox.html");
}

function get_html_breaks($q) {
	 $retval = "";
	 for($i = 0; $i < $q; $i++) {
	 	$retval .= "<br>";
	 }
	 return $retval;
}

?>