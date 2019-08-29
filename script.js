class magnifyingGlass {
	constructor(elem, radius) {
		this._img = elem;
		this._loupeRadius = radius;
		this.getListeners();
	}
	getListeners() {
		this._img.addEventListener("mouseenter", showLoupe);
		let top, left, right, bottom, scale;
		let self = this;

		function showLoupe(event) {
			self.getOriginalWidth();
			self._loupe = document.createElement("div");
			self._loupe.className = 'loupe';
			self._loupe.style.width = self._loupe.style.height = `${self._loupeRadius * 2}px`;
			if(!self._loupe.style.background) {
				self._loupe.style.background =  `url('${self._img.getAttribute("src")}') no-repeat `;
			}
			onMouseMove(event);
			document.body.append(self._loupe);
			self._img.removeEventListener("mouseenter", showLoupe);
			self._loupe.addEventListener("mousemove", onMouseMove);
		}
		function onMouseMove(e) {
			moveAt(self._loupe, e.pageX, e.pageY); 
			let [newX, newY] = getShifts(self._img, event);
			self._loupe.style.backgroundPosition = `${-newX}px ${-newY}px`;
			if(e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
				self._loupe.remove();
				self._img.addEventListener("mouseenter", showLoupe);
				return;
			}
		}
		function getShifts(elem, event) {
			left = elem.getBoundingClientRect().left;
			right = elem.getBoundingClientRect().right;
			top = elem.getBoundingClientRect().top;
			bottom = elem.getBoundingClientRect().bottom;
			scale = self._originalWidth / (right - left);
			return [(event.clientX - left) * scale - self._loupeRadius, 
							(event.clientY - top) * scale - self._loupeRadius];
		}
		const moveAt = function(elem, pageX, pageY){
			elem.style.left = `${pageX}px`;
			elem.style.top = `${pageY}px`;
		}
	}

	// this function may be useful outside
	getOriginalWidth() {
		 // for speed-up get originalWidth only when entered the image and only once
		if(this._originalWidth) {
			return;
		}
		let helperImg = document.createElement("img");
		helperImg.className = "helperImg";
		helperImg.setAttribute("src", this._img.getAttribute("src"));
		document.body.after(helperImg);
		this._originalWidth = helperImg.getBoundingClientRect().right - helperImg.getBoundingClientRect().left;
		helperImg.remove();
	}
}
let images = document.querySelectorAll("img");
for(let image of images) {
	image = new magnifyingGlass(image, 150);
}