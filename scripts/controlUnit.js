/*
BIT OUTPUT:
1: mdr r/w
2: mdr mux
3: ram r/w
4: rom en
5: mar en
6: mar mux
7: pc en
8: alu mux
9: alu en
10: acc mux
11: mir en
*/
const stateOutputs = {
	0: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	1: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	2: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	3: [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
	4: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
	5: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	6: [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
	7: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	8: [0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
	9: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
	10: [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
	11: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	12: [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
	13: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
	14: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const routeMappings = {
	0: 1,
	1: 2,
	"2:0000": 3, // ADD
	"2:0001": 3, // SUB
	"2:0010": 3, // AND
	"2:0011": 3, // OR
	"2:0100": 3, // LOAD A
	"2:0101": 5, // MOV ADDR, A
	"2:0110": 7, // MOV A, ADDR
	"2:0111": 14, // JUMP
	"2:1000": 9, // ADD DIR
	"2:1001": 9, // SUB DIR
	"2:1010": 9, // AND DIR
	"2:1011": 9, // OR DIR
	"2:1111": 13, // NOP
	3: 4, // ALU OP
	4: 0,
	5: 6, // MOV A
	6: 0,
	7: 8, // MOV ADDR
	8: 0,
	9: 10, // ALU DIR
	10: 11,
	11: 12,
	12: 0,
	13: 0, // NOP
	14: 0, // TODO: JMP
};

const getNextState = (state, input) => {
	key = `${state}:${input.join("")}`;
	noInputState = `${state}`;

	if (routeMappings[noInputState] !== undefined)
		return routeMappings[noInputState];
	else return routeMappings[key];
};

const getControlUnit = () => {
	let state = 0x0;

	let set = (newState) => {
		state = newState;
	};

	let get = () => stateOutputs[state];

	let tick = (input) => {
		next = getNextState(state, input);
		set(next);
		return get();
	};

	return {
		current: state,
		set: set,
		get: get,
		tick: tick,
	};
};
