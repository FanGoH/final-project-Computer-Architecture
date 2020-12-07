const mir = new Register("MIR", 1, 3);
board.appendChild(mir.generateHTML());

mir.setUpdate(({ en, components }) => {
	if (!en) return;
	const { mar, rom } = components;
	const address = bin2dec(mar.read());
	const data = rom.read(address).slice(1, 4);
	mir.write(0, data);
});
