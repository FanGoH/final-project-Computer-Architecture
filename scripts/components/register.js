class Register {
	constructor(
		name,
		noAddress,
		bitWidth,
		userWritable = false,
		readOnly = false
	) {
		this.name = name;
		this.noAddress = noAddress;
		this.bitWidth = bitWidth;
		this.readOnly = readOnly;
		this.userWritable = userWritable;

		this.enable = 0;
		this.mux = 0;

		this.memory = [...new Array(noAddress)].map(() =>
			new Array(bitWidth).fill(0)
		);
	}

	read(address = 0) {
		return this.memory[address];
	}

	setEnable(param) {
		this.enable = param;
	}

	setMux(param) {
		this.mux = param;
	}

	updateCellRender(i, j) {
		this.bitsHtmlArray[i][j].innerHTML = this.memory[i][j] ? "1" : "0";
	}

	alternateBit(i, j) {
		this.memory[i][j] = this.memory[i][j] ? 0 : 1;
		this.updateCellRender(i, j);
	}

	write(i, newMemory = []) {
		newMemory.forEach((value, idx) => {
			this.memory[i][idx] = value;
			this.updateCellRender(i, idx);
		});
	}
	// setupDate
	setUpdate(func) {
		this.update = func;
	}
	setRead(fnc) {
		this.read = fnc;
	}
	setWrite(fnc) {
		this.customWrite = fnc;
	}

	//update({ en, mux, components }) {}

	generateHTML() {
		this.parentDiv = document.createElement("div");
		this.parentDiv.classList.add("register-container");

		this.parentDiv.style.gridArea = `${this.name}`;

		this.title = document.createElement("h4");
		this.title.classList.add("register-title");
		this.title.innerHTML = `${this.name}`;
		this.parentDiv.appendChild(this.title);

		const addressContainer = document.createElement("div");
		addressContainer.classList.add("register-memory-container");
		addressContainer.id = `${this.name}-addresses`;
		this.parentDiv.appendChild(addressContainer);

		this.bitsHtmlArray = [];
		for (let i = 0; i < this.noAddress; i++) {
			const memory = document.createElement("div");
			memory.classList.add("memory-address");

			const addressHTML = [];

			const p = document.createElement("p");
			p.classList.add("register-memory-address-label");
			p.innerHTML = `0x0${i}`;

			memory.appendChild(p);

			for (let j = 0; j < this.bitWidth; j++) {
				const nuevoDiv = document.createElement("div");
				nuevoDiv.classList.add("bit-container");

				nuevoDiv.innerHTML = this.memory[i][j] ? "1" : "0";

				nuevoDiv.addEventListener("click", () => {
					this.alternateBit(i, j);
				});

				addressHTML.push(nuevoDiv);

				memory.appendChild(nuevoDiv);
			}

			addressContainer.appendChild(memory);
			this.bitsHtmlArray.push(addressHTML);
		}

		return this.parentDiv;
	}
}

const board = document.querySelector("#board");
