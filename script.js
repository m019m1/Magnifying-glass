class magnifyingGlass {
	constructor(elem, radius) {
		this._img = elem;
		this._loupeRadius = radius;
		this.run();
	}
	run() {
		let {left, right, top, bottom} = getCoords(this._img);
		let originalWidth, scale;
		let self = this;
	
		this._img.addEventListener("mouseenter", showLoupe);

		function getCoords(elem) {
			let box = elem.getBoundingClientRect();
		
			return {
				//expand border to 1px for correct border conditions
				top: Math.round(box.top) - 1 + pageYOffset,
				bottom: Math.round(box.bottom) + 1 + pageYOffset,
				left: Math.round(box.left) - 1 + pageXOffset,
				right: Math.round(box.right) + 1 + pageXOffset
			};
		}

		function showLoupe(e) {
			self._loupe = document.createElement("div");
			self._loupe.className = 'loupe';
			self._loupe.style.width = self._loupe.style.height = `${self._loupeRadius * 2}px`;
			if(!self._loupe.style.background) {
				self._loupe.style.background =  `url('${this.getAttribute("src")}') no-repeat `;
			}
			onMouseMove(e);
			document.body.append(self._loupe);
			this.removeEventListener("mouseenter", showLoupe);
			document.addEventListener("mousemove", onMouseMove);
			
		}
		function onMouseMove(e) {
			moveAt(self._loupe, e.pageX, e.pageY);
			changeBackgroundPosition(e);
			
			// border conditions
			if(e.pageX < left || e.pageX > right || e.pageY < top || e.pageY > bottom) {
				self._loupe.remove();
				self._img.addEventListener("mouseenter", showLoupe);
				document.removeEventListener("mousemove", onMouseMove);
			}
		}
		function changeBackgroundPosition(event) {
			if(!originalWidth) {
				let helperImg = document.createElement("img");
				helperImg.src = self._img.src;
				originalWidth = helperImg.width;
			}
			scale = originalWidth / (right - left);
			let [newX, newY] =  [(event.pageX - left) * scale - self._loupeRadius, 
												   (event.pageY - top) * scale - self._loupeRadius];
			self._loupe.style.backgroundPosition = `${-newX}px ${-newY}px`;
		}
		function moveAt(elem, pageX, pageY){
			elem.style.left = `${pageX}px`;
			elem.style.top = `${pageY}px`;
		}
	}
}

let images = document.querySelectorAll("img");
for(let image of images) {
	image = new magnifyingGlass(image, 120);
}