const instructions = {
	"ADD#": [0, 0, 0, 0],
	"SUB#": [0, 0, 0, 1],
	"AND#": [0, 0, 1, 0],
	"OR#": [0, 0, 1, 1],
	"LDA#": [0, 1, 0, 0],
	MVA: [0, 1, 0, 1],
	MVR: [0, 1, 1, 0],
	ADD: [1, 0, 0, 0],
	SUB: [1, 0, 0, 1],
	AND: [1, 0, 1, 0],
	OR: [1, 0, 1, 1],
	NOP: [1, 1, 1, 1],
};

const valueMappings = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	A: 10,
	B: 11,
	C: 12,
	D: 13,
	E: 14,
	F: 15,
};

const hex2dec = (str) => {
	return str
		.split()
		.slice()
		.reverse()
		.reduce((p, v, i) => p + Math.pow(15, i) * valueMappings[v]);
};

const strToBits = (input) => {
	return input.split().map((v) => parseInt(v));
};

const getRawStr = (str) => {
	str = str.replace("0x", "");
	return str.replace(/\D/g, "");
};

const formatData = (dataStr) => {
	if (dataStr.toLowerCase().includes("0x")) {
		dataStr = hex2dec(getRawStr(dataStr)).toString();
	}
	return getRawStr(dataStr);
};

///MVA #5  => Mov A -> Addr
//MVR      => Mov Addr -> A
// E
// MOV A, #5
// MOV 0x3, #6
// MOV 0x1, 0x3 ??????
// MOV A, 3

// MOV 1, 3

// MVA 3
// MVR 1

//MVA

const DATA_BIT_WIDTH = 4;
const getOpCode = (instruction) => {
	let [opName, data] = instruction.split(" ");
	opName = opName.toUpperCase();
	data = formatData(data);
	let binData = dec2bin(data, DATA_BIT_WIDTH);
	let ins = "";
	if (instruction.includes("#")) {
		ins = instructions[`${opName}#`].concat(binData);
	} else {
		ins = instructions[`${opName}`].concat(binData);
	}
	return ins;
};
