function replaceSpecialCharsInText(str_in) {

	let result = str_in;
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

	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	if (document.getElementById(elem.id)) {
		document.getElementById(elem.id).onmousedown = dragMouseDown;
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

function parseInnerHTML(elem, value="<span style=\'font-style: italic\'>Click on a cell to see it like in game</span>") {
	const parser = new window.DOMParser(window);
	const parsedDoc = parser.parseFromString(`<div id="parsedContentTotalDiv">${value}</div>`, 'text/html');
	elem.replaceChildren(parsedDoc.getElementById("parsedContentTotalDiv"));
}

function injectPreviewIntoPage() {

	let linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	linkElement.href = chrome.runtime.getURL("inject.css");
	document.head.appendChild(linkElement);

	let div = document.createElement('div');
	div.setAttribute("id", "dragDiv");

	document.body.append(div);

	let divHeader = document.createElement('div');
	divHeader.setAttribute("id", "dragDivHeader");

	div.appendChild(divHeader);

	let headerImg = document.createElement('img');
	headerImg.setAttribute("id", "dragDivHeaderImg");
	headerImg.setAttribute("alt", "coach");
	headerImg.setAttribute("src", chrome.runtime.getURL("icon-48.png"));

	let divTranslate = document.createElement('div');
	divTranslate.setAttribute("id", "dragDivTranslation");

	let spanCellText = document.createElement('span');
	spanCellText.setAttribute("id", "spanCellTranslatedText");
	parseInnerHTML(spanCellText);

	div.appendChild(divTranslate);

	let spanHeaderText = document.createElement('span');
	spanHeaderText.setAttribute("id", "spanHeaderText");
	spanHeaderText.innerText = "    Coach's Translation Tool";

	divHeader.appendChild(headerImg);
	divHeader.appendChild(spanHeaderText);

	divTranslate.appendChild(spanCellText);

	div.style.display = 'block';

	let target = document.querySelector('#t-formula-bar-input > .cell-input');

	let observer = new MutationObserver(function(mutations) {
		const strToWatch = target.innerText.trim();
		const spanCell = document.getElementById("spanCellTranslatedText");

		if (strToWatch.startsWith("last updated") || strToWatch.length <= 0) {
			parseInnerHTML(spanCell);
		} else {
			parseInnerHTML(spanCell, replaceSpecialCharsInText(strToWatch));
		}
	});

	observer.observe(target, {
		attributes:    true,
		childList:     true,
		characterData: true
	});

	dragElement(document.getElementById("dragDiv"));
}

var prevWinDiv = document.querySelector('#dragDiv');

if (prevWinDiv === null) {
	injectPreviewIntoPage();
} else if (prevWinDiv.style.display === 'none') {
	prevWinDiv.style.display = 'block';
} else {
	prevWinDiv.style.display = 'none';
}


