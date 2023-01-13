function replaceSpecialCharsInText(str_in) {

	var result = str_in;
	result = result.replace(/&/g,"&amp;");
	result = result.replace(/\</g,"&lt;");
	result = result.replace(/\>/g,"&gt;");
	result = result.replace(/\[b\]/gm,"<b>");
	result = result.replace(/\[\/b\]/gm,"</b>");
	result = result.replace(/\[bb\]/g,"<span class='bb'>");
	result = result.replace(/\[\/bb\]/g,"</span>");
	result = result.replace(/\|n/g,"<br />");
	result = result.replace(/\|amp/g,"&");
	result = result.replace(/\[ss\]/g,"<span class='ss'>");
	result = result.replace(/\[\/ss\]/g,"</span>");
	result = result.replace(/\|emoji\(([a-zA-Z0-9\/._]+)\)/g,"<img class='emoji-icon' src='https://cdn.legiontd2.com/emotes/$1.png' />");
	result = result.replace(/\|bigemoji\(([a-zA-Z0-9\/._]+)\)/g,"<img class='emoji-icon-big' src='https://cdn.legiontd2.com/emotes/$1.png' />");
	result = result.replace(/\|skullimg\(([a-zA-Z0-9\/._()-]+)\.png\)/g,"<span class='skull-img'><img class='tooltip-icon' src='https://cdn.legiontd2.com/$1.png' /></span>");
	result = result.replace(/\|desc\(([a-zA-Z0-9\/._,%]+)\)/g,"<span class='apex-data' title='This will be replaced with the description in game'>$1</span>");
	result = result.replace(/\|proper\(([a-zA-Z0-9\/._,%]+)\)/g,"<span class='apex-data' title='This will be replaced with the proper name in game'>$1</span>");
	result = result.replace(/\|item\(([a-zA-Z0-9\/._,%]+)\)/g,"<span class='apex-data' title='This will be replaced with the item icon + name in game'>$1</span>");
	result = result.replace(/\|img\(([a-zA-Z0-9\/._()-]+)\.png\)/g,"<img class='tooltip-icon' src='https://cdn.legiontd2.com/$1.png' />");
	result = result.replace(/\|smallimg\(([a-zA-Z0-9\/._()-]+)\.png\)/g,"<img class='tooltip-icon-small' src='https://cdn.legiontd2.com/$1.png' />");
	result = result.replace(/\|graphic\(([a-zA-Z0-9\/\-._]+)\)/g,"<img src='https://cdn.legiontd2.com/$1' />");
	result = result.replace(/\|bigimg\(([a-zA-Z0-9\/\-._]+)\)/g,"<img src='https://cdn.legiontd2.com/$1' style='border: 1px solid rgba(218, 251, 248, 0.5); margin: 3px;' />");
	result = result.replace(/\|splash\(([a-zA-Z0-9\/\-._]+)\)/g,"<img class='styledtext-splash-image' src='https://cdn.legiontd2.com/$1' />");
	result = result.replace(/\|video\(([a-zA-Z0-9\/\-._]+)\)/g,"<span class='apex-data' title='This will be replaced with a video in game'>$1</span>");
	result = result.replace(/\|flag\(([a-zA-Z0-9\/\-._]+)\)/g,"<span class='simple-tooltip flag-icon small flag-icon-$1'><span class='tooltiptext narrow'>Country name</span></span>");
	result = result.replace(/\|c\(([a-zA-Z0-9]{6})\):(.*?)\|r/g,"<span style='color: #$1'>$2</span>");
	result = result.replace(/:([a-z]+):/g,"<img class='emoji-icon' src='https://cdn.legiontd2.com/emotes/$1.png' />");
	
	return result;
}

function dragElement(elem) {
	
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	
	if (document.getElementById(elem.id + "Header")) {
		document.getElementById(elem.id + "Header").onmousedown = dragMouseDown;
	} else {
		elem.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elem.style.top = (elem.offsetTop - pos2) + "px";
		elem.style.left = (elem.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function injectCSS(source) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	linkElement.href = source;
	document.head.appendChild(linkElement);
}

function injectCSSSheet(sheetContent) {
	var linkElement = document.createElement("style");
	linkElement.innerHTML = sheetContent;
	document.head.appendChild(linkElement);
}

function onWindowReady() {

	injectCSS("https://use.fontawesome.com/releases/v5.0.6/css/all.css");
	injectCSS("https://developer.legiontd2.com/black/css/nucleo-icons.css");
	injectCSS("https://developer.legiontd2.com/css/btf.css");
	injectCSS("https://developer.legiontd2.com/css/style.css");
	injectCSS("https://developer.legiontd2.com/css/flag-icon.css");
	injectCSS("https://developer.legiontd2.com/black/css/black-dashboard.css?v=1.0.3");
	injectCSS("https://developer.legiontd2.com/black/css/theme.css");
	injectCSSSheet("" +
		"@font-face {\n" +
		"    font-family: 'Poppins';\n" +
		"    font-style: normal;\n" +
		"    font-weight: 400;\n" +
		"    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2) format('woff2');\n" +
		"    unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;\n" +
		"}\n" +
		"#dragDiv {\n" +
		"    position: absolute;\n" +
		"    z-index: 9;\n" +
		"    background-color: transparent; /*/*red;/*#1d1d2e;*/\n" +
		"    border-color: red;\n" +
		"    /* border: 1px solid #d3d3d3; */\n" +
		"    text-align: left;\n" +
		"    top: 5%;\n" +
		"    left: 5%;\n" +
		"    width: auto;\n" +
		"    max-width: 400px;\n" +
		"    max-height: 1000px;\n" +
		"    height: auto;\n" +
		"    font-family: poppins,sans-serif;\n" +
		"    box-sizing: border-box;\n" +
		"    border-radius: 100px;\n" +
		"    padding-top: -10px;\n" +
		"}\n" +
		"#dragDivHeader {\n" +
		"    width: auto;\n" +
		"    height: 0;\n" +
		"    cursor: move;\n" +
		"    z-index: 10;\n" +
		"    color: white;\n" +
		"    font-family: poppins,sans-serif;\n" +
		"    text-align: left;\n" +
		"    background-color: /*#27293d;*/\n" +
		"    border-color: 100px;/*rgba(100, 1000, 0, 200;*/\n" +
		"    border-top: -50px;\n" +
		"    padding: -5px;\n" +
		"    text-transform: uppercase;\n" +
		"    font-size: 1rem;\n" +
		"}\n" +
		"#dragDivTranslation {\n" +
		"    width: 100%;\n" +
		"    height: 100%;\n" +
		"    background-color: #27293d;\n" +
		"    color: white;\n" +
		"    border-color: transparent;\n" +
		"    border-bottom: 5px;\n" +
		"    overflow-y:auto;\n" +
		"    box-sizing: border-box;\n" +
		"    font-size: 14px;\n" +
		"    font-weight: 700;\n" +
		"    line-height: 21px;\n" +
		"    text-align: left;\n" +
		"    text-transform: none;\n" +
		"    -webkit-font-smoothing: antialiased;\n" +
		"    overflow-wrap: break-word;\n" +
		"    user-select: none;\n" +
		"    -webkit-tap-highlight-color: rgba(0,0,0,0);\n" +
		"    padding: 5px;\n" +
		"}\n" +
		".apex-data{\n" +
		"    margin: 2px;\n" +
		"    padding: 0 5px;\n" +
		"    display:inline-block;\n" +
		"    background-color: #464646;\n" +
		"    border: 1px dashed #707070;\n" +
		"}"
	);

	var div = document.createElement("div");
	div.setAttribute("id", "dragDiv");
	document.body.append(div);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.runtime.getURL("preview_box.html"), true);
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			document.getElementById("dragDiv").innerHTML = xhr.responseText;
			dragElement(document.getElementById("dragDiv"));

			function addObserverIfDesiredNodeAvailable() {

				console.log("CHECKING FOR CELL");

				var target = document.querySelector('#t-formula-bar-input > .cell-input')

				if (target === null) {
					window.setTimeout(addObserverIfDesiredNodeAvailable,500);
					return;
				}

				var observer = new MutationObserver(function(mutations) {
					document.getElementById("dragDivTranslation").innerHTML = replaceSpecialCharsInText(target.innerText);
				});

				observer.observe(target, {
					attributes:    true,
					childList:     true,
					characterData: true
				});
			}
			addObserverIfDesiredNodeAvailable();
		}
	};
	xhr.send();
}

// When page is loaded
window.onload = (event) => onWindowReady();


/*
<script src="https://developer.legiontd2.com/black/js/core/jquery.min.js"></script>
<script src="https://developer.legiontd2.com/black/js/core/popper.min.js"></script>
<script src="https://developer.legiontd2.com/black/js/core/bootstrap.min.js"></script>
<script src="https://developer.legiontd2.com/black/js/plugins/perfect-scrollbar.jquery.min.js"></script>
<script src="https://developer.legiontd2.com/black/js/plugins/bootstrap-notify.js"></script>
<script src="https://developer.legiontd2.com/black/js/black-dashboard.min.js?v=1.0.0"></script>
<script src="https://developer.legiontd2.com/black/js/theme.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
<script src="https://developer.legiontd2.com/black/js/plugins/chartjs.min.js"></script>
 */


/*

#dragDiv {
	position: absolute;
	z-index: 9;
	background-color: transparent;
	border-color: red;
	text-align: left;
	top: 5%;
	left: 5%;
	width: auto;
	max-width: 400px;
	max-height: 1000px;
	height: auto;
	font-family: poppins,sans-serif;
	box-sizing: border-box;
	border-radius: 100px;
	padding-top: -10px;
}

#dragDivHeader {
	width: auto;
	height: 0;
	cursor: move;
	z-index: 10;
	color: white;
	font-family: poppins,sans-serif;
	text-align: left;
	background-color:
	border-color: 100px;
	border-top: -50px;
	padding: -5px;
	text-transform: uppercase;
	font-size: 1rem;
}

#dragDivTranslation {
	width: 100%;
	height: 100%;
	background-color: #27293d;
	color: white;
	border-color: transparent;
	border-bottom: 5px;
	overflow-y:auto;
	box-sizing: border-box;
	font-size: 14px;
	font-weight: 700;
	line-height: 21px;
	text-align: left;
	text-transform: none;
	-webkit-font-smoothing: antialiased;
	overflow-wrap: break-word;
	user-select: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	padding: 5px;
}

.apex-data{
	margin: 2px;
	padding: 0 5px;
	display:inline-block;
	background-color: #464646;
	border: 1px dashed #707070;
}

 */
