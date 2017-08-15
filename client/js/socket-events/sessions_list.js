"use strict";

const $ = require("jquery");
const socket = require("../socket");
const templates = require("../../views");
const list = $("#session-list");

socket.on("sessions:list", function(data) {
	data.sort((a, b) => b.lastUse - a.lastUse);

	let html = "";
	data.forEach((connection) => {
		html += templates.session(connection);
	});

	list.html(html);
});

$("#settings").on("click", ".remove-session", function() {
	socket.emit("sign-out", $(this).data("token"));

	return false;
});
