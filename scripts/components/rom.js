const rom = new Register("ROM", 8, 8);
board.appendChild(rom.generateHTML());

rom.setUpdate(({ en, components }) => {});
