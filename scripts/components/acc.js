const acc = new Register("ACCUM", 1, 4);
board.appendChild(acc.generateHTML());

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
