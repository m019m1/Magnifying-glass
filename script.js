let loupe;
let img1 = document.querySelector("img");
let originalWidth;
img1.addEventListener("mouseenter", showLoupe);
let top1, left, right, bottom, scale;

function showLoupe() {
	loupe = document.createElement("div");
	loupe.className = 'loupe';
	let img2 = document.createElement("img");
	img2.className = "helperImg";
	img2.setAttribute("src", img1.getAttribute("src"));
	document.body.after(img2);
	originalWidth = img2.getBoundingClientRect().right - img2.getBoundingClientRect().left;
	img2.remove();

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
