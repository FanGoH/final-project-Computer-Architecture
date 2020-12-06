const REG_BIT_WIDTH = 4;

const getALU = () => {
	const operations = {
		"0000": (a, b) => dec2bin(bin2dec(a) + bin2dec(b), REG_BIT_WIDTH),
		"0001": (a, b) => dec2bin(bin2dec(a) - bin2dec(b), REG_BIT_WIDTH),
		"0010": (a, b) => zip(a, b).map(([ai, bi]) => ai && bi),
		"0011": (a, b) => zip(a, b).map(([ai, bi]) => ai || bi),
		"0100": (_, b) => b,
	};

	const update = ({ components }) => {};

	const calculate = ({ components }) => {
		const opcode = "0" + components.mir.read().join("");
		const data = components.mdr.read();
		const acc = components.acc;
		console.log(opcode);
		return operations[opcode](acc.read(), data);
	};

	return {
		update,
		calculate,
	};
};
