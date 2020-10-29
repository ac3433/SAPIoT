/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ns/CSVUP/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
