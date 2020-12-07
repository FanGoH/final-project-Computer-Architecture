const mar = new Register("MAR", 1, 3);
board.appendChild(mar.generateHTML());

mar.setUpdate(({ en, mux, components }) => {
	if (!en) return;
	if (mux == 0) {
		mar.write(0, pc.read());
	} else {
		const data = rom.read(bin2dec(mar.read()));
		mar.write(0, data.slice(5, 8));
	}
});
