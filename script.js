class magnifyingGlass {
	constructor(elem) {
		this._img = elem;
		this.getListeners();
	}
	getListeners() {
		this.getOriginalWidth();
		this._img.addEventListener("mouseenter", showLoupe);
		let loupe, top, left, right, bottom, scale;
		let img = this._img;
		let originalWidth = this._originalWidth;

		function showLoupe(event) {
			loupe = document.createElement("div");
			loupe.className = 'loupe';

/* 			let [newX, newY] = getPosition(img, event);
			loupe.style.background = `url('Treehouse.jpg') no-repeat ${-newX}px ${-newY}px`;
			moveAt(loupe, event.pageX, event.pageY); */
			onMouseMove(event);
			document.body.append(loupe);
			img.removeEventListener("mouseenter", showLoupe);
			document.addEventListener("mousemove", onMouseMove);
		}
		function getPosition(elem, event) {
			left = elem.getBoundingClientRect().left;
			right = elem.getBoundingClientRect().right;
			top = elem.getBoundingClientRect().top;
			bottom = elem.getBoundingClientRect().bottom;
			scale = originalWidth / (right - left);
			return [(event.clientX - left) * scale - 100, (event.clientY - top) * scale - 100];
		}
		function moveAt(elem, pageX, pageY){
			elem.style.left = `${pageX}px`;
			elem.style.top = `${pageY}px`;
		}
		function onMouseMove(e) {
			moveAt(loupe, e.pageX, e.pageY); 
			let [newX, newY] = getPosition(img, event);
			loupe.style.background = `url('${img.getAttribute("src")}') no-repeat ${-newX}px ${-newY}px`;
			if(e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
				document.removeEventListener("mousemove", onMouseMove);
				loupe.remove();
				img.addEventListener("mouseenter", showLoupe);
			}
		}
	}
	getOriginalWidth() {
		let helperImg = document.createElement("img");
		helperImg.className = "helperImg";
		helperImg.setAttribute("src", this._img.getAttribute("src"));
		document.body.after(helperImg);
		this._originalWidth = helperImg.getBoundingClientRect().right - helperImg.getBoundingClientRect().left;
		helperImg.remove();
	}
}
// let image = new magnifyingGlass(document.querySelectorAll("img")[0]);
let images = document.querySelectorAll("img");
let loupes = [];
for(image of images) {
	loupes.push(new magnifyingGlass(image));
}


/* let loupe;
let img1 = document.querySelector("img");
let originalWidth;
img1.addEventListener("mouseenter", showLoupe);
let top1, left, right, bottom, scale;

function showLoupe() {
	loupe = document.createElement("div");
	loupe.className = 'loupe';
	let helperImg = document.createElement("img");
	helperImg.className = "helperImg";
	helperImg.setAttribute("src", img1.getAttribute("src"));
	document.body.after(helperImg);
	originalWidth = helperImg.getBoundingClientRect().right - helperImg.getBoundingClientRect().left;
	helperImg.remove();

	let [newX, newY] = getPosition(img1, event);
	loupe.style.background = `url('Treehouse.jpg') no-repeat ${-newX}px ${-newY}px`;
	document.body.append(loupe);
	moveAt(loupe, event.pageX, event.pageY);
	img1.removeEventListener("mouseenter", showLoupe);
	document.addEventListener('mousemove', onMouseMove);
}

function getPosition(elem, event) {
	left = elem.getBoundingClientRect().left;
	right = elem.getBoundingClientRect().right;
	top1 = elem.getBoundingClientRect().top;
	bottom = elem.getBoundingClientRect().bottom;
	scale = originalWidth / (right - left);
	return [(event.clientX - left) * scale - 100, (event.clientY - top1) * scale - 100];
}

function moveAt(el, pageX, pageY){
	el.style.left = `${pageX}px`;
	el.style.top = `${pageY}px`;
}

function onMouseMove(e) {
	moveAt(loupe, e.pageX, e.pageY); 
	
	let [newX, newY] = getPosition(img1, event);
	loupe.style.background = `url('Treehouse.jpg') no-repeat ${-newX}px ${-newY}px`;
	if(e.clientX < left || e.clientX > right || e.clientY < top1 || e.clientY > bottom) {
		document.removeEventListener('mousemove', onMouseMove);
		loupe.remove();
		img1.addEventListener("mouseenter", showLoupe);
	}

}
 */