const TIMING = document.querySelector(".clock-hz");

const getHz = () => {
	return 1 / parseFloat(document.querySelector(".clock-hz").value);
};

let clockStarted = false;
let currentClock = setTimeout(() => {}, 0);
const scheduleClockTick = () => {
	return setTimeout(() => {
		clock.tick();
		scheduleClockTick();
	}, 1000 * getHz());
};

document
	.querySelector("#clockControl")
	.addEventListener("click", ({ target }) => {
		if (!clockStarted) {
			currentClock = scheduleClockTick();
			target.innerHTML = "Stop Clock";
			clockStarted = true;
		} else {
			clearTimeout(currentClock);
			currentClock = setTimeout(() => {}, 0);
			target.innerHTML = "Start Clock";
			clockStarted = false;
		}
	});

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

const alu = getALU();
const ram = new Register("RAM", 8, 4);
const mar = new Register("MAR", 1, 3);
const mdr = new Register("MDR", 1, 4);
const mir = new Register("MIR", 1, 3);
const rom = new Register("ROM", 8, 8);
const acc = new Register("ACCUM", 1, 4);
const pc = new Register("PC", 1, 3);

const board = document.querySelector("#board");

board.appendChild(ram.generateHTML());
board.appendChild(mar.generateHTML());
board.appendChild(mdr.generateHTML());
board.appendChild(mir.generateHTML());
board.appendChild(rom.generateHTML());
board.appendChild(acc.generateHTML());
board.appendChild(pc.generateHTML());

const clock = getClock({ mdr, ram, rom, mar, pc, alu, acc, mir });

rom.setUpdate(({ en, components }) => {
	//
});

mir.setUpdate(({ en, components }) => {
	if (!en) return;
	const { mar, rom } = components;
	const address = bin2dec(mar.read());
	const data = rom.read(address).slice(1, 4);
	mir.write(0, data);
});

ram.setUpdate(({ en, components }) => {
	if (!en) return;
	const address = bin2dec(mar.read());
	const data = acc.read();
	ram.write(address, data);
});

mar.setUpdate(({ en, mux, components }) => {
	if (!en) return;
	if (mux == 0) {
		mar.write(0, pc.read());
	} else {
		const data = rom.read(bin2dec(mar.read()));
		mar.write(0, data.slice(5, 8));
	}
});

mdr.setUpdate(({ en, mux, components }) => {
	if (!en) return;

	if (mux == 0) {
		mdr.write(0, ram.read(bin2dec(mar.read())));
	} else {
		const data = rom.read(bin2dec(mar.read()));
		mdr.write(0, data.slice(4, 8));
	}
});

pc.setUpdate(({ en }) => {
	if (!en) return;
	const value = bin2dec(pc.read());
	const width = pc.read().length;
	pc.write(0, dec2bin(value + 1, width));
});

acc.setUpdate(({ en, mux, components }) => {
	if (en === 0) return;
	const { alu, acc, ram } = components;

	if (mux === 0) {
		const result = alu.calculate({ components });
		acc.write(0, result);
	} else {
		const addr = bin2dec(mar.read());
		acc.write(0, ram.read(addr));
	}
});

document.querySelector("#submitInstructions").addEventListener("click", () => {
	const inst = document
		.querySelector("#instructionInput")
		.value.toUpperCase()
		.split("\n");
	inst.forEach((element, i) => {
		if (i >= 7) {
			return;
		}
		rom.write(i, getOpCode(element));
	});
});
