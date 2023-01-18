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

	var div = document.createElement("div");
	div.setAttribute("id", "dragDiv");
	document.body.append(div);

	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.runtime.getURL("preview_box.html"), true);
	console.log(chrome.runtime.getURL("preview_box.html"));
	xhr.onreadystatechange = function()
	{
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			document.getElementById("dragDiv").innerHTML = xhr.responseText;
			dragElement(document.getElementById("dragDiv"));

			function addObserverIfDesiredNodeAvailable() {

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
