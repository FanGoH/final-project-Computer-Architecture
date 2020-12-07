const ram = new Register("RAM", 8, 4);
board.appendChild(ram.generateHTML());

ram.setUpdate(({ en, components }) => {
	if (!en) return;
	const address = bin2dec(mar.read());
	const data = acc.read();
	ram.write(address, data);
});
