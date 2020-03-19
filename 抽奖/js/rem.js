function a(designWidth){
	if (/Android(?:\s+|\/)(\d+\.\d+)?/.test(navigator.userAgent)) {
		var version = parseFloat(RegExp.$1);
		if (version > 2.3) {
			var phoneScale = parseInt(window.screen.width) / designWidth;
			document.write('<meta name="viewport" content="width=' + designWidth + ',minimum-scale=' + phoneScale + ',maximum-scale=' + phoneScale + ', target-densitydpi=device-dpi">');
		} else {
			document.write('<meta name="viewport" content="width=' + designWidth + ',target-densitydpi=device-dpi">');
		}
	} else {
		document.write('<meta name="viewport" content="width=' + designWidth + ',user-scalable=no,target-densitydpi=device-dpi,minimal-ui,viewport-fit=cover">');
	}
}(750)