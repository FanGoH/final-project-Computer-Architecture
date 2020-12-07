const mdr = new Register("MDR", 1, 4);
board.appendChild(mdr.generateHTML());

mdr.setUpdate(({ en, mux, components }) => {
	if (!en) return;

	if (mux == 0) {
		mdr.write(0, ram.read(bin2dec(mar.read())));
	} else {
		const data = rom.read(bin2dec(mar.read()));
		mdr.write(0, data.slice(4, 8));
	}
});
