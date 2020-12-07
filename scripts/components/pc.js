const pc = new Register("PC", 1, 3);
board.appendChild(pc.generateHTML());

pc.setUpdate(({ en }) => {
	if (!en) return;
	const value = bin2dec(pc.read());
	const width = pc.read().length;
	pc.write(0, dec2bin(value + 1, width));
});
