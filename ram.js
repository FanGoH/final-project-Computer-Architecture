const memoryLocations = {
	"000": [0, 0, 0, 0],
	"001": [0, 0, 0, 0],
	"010": [0, 0, 0, 0],
	"011": [0, 0, 0, 0],
	100: [0, 0, 0, 0],
	101: [0, 0, 0, 0],
	110: [0, 0, 0, 0],
	111: [0, 0, 0, 0],
};

const enable = 0;
const mux = 0;

function setEnable(param) {
	enable = param;
}

function setMux(parm) {
	mux = param;
}

function writeMemory(MuxList, address) {
	if (enable == 1) {
		memoryLocations[addres] = MuxList[mux];
	}
}

// function fabricateRAM(register) -> {update, get, ...}
