class magnifyingGlass {
	constructor(elem, radius) {
		this._img = elem;
		this._loupeRadius = radius;
		this.run();
	}
	run() {
		let {left, right, top, bottom} = this._img.getBoundingClientRect();
		let scale;
		let self = this;

		this._img.addEventListener("mouseenter", showLoupe);

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
			document.addEventListener("mousemove", onMouseMove);
		}
		function onMouseMove(e) {
			moveAt(self._loupe, e.pageX, e.pageY); 
			changePosition(e);
			
			if(e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) {
				self._loupe.remove();
				self._img.addEventListener("mouseenter", showLoupe);
				document.removeEventListener("mousemove", onMouseMove);
			}
		}
		function changePosition(event) {
			scale = self._originalWidth / (right - left);
			let [newX, newY] =  [(event.clientX - left) * scale - self._loupeRadius, 
												   (event.clientY - top) * scale - self._loupeRadius];
			self._loupe.style.backgroundPosition = `${-newX}px ${-newY}px`;
		}
		function moveAt(elem, pageX, pageY){
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
		helperImg.src = this._img.src;
		this._originalWidth = helperImg.width;
	}
}
let images = document.querySelectorAll("img");
for(let image of images) {
	image = new magnifyingGlass(image, 120);
}