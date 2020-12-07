const TIMING = document.querySelector(".clock-hz");

const getHz = () => {
	return 1 / parseFloat(document.querySelector(".clock-hz").value);
};

let clockStarted = false;
let currentClock = setTimeout(() => {}, 0);
const scheduleClockTick = () => {
	return setTimeout(() => {
		clock.tick();
		scheduleClockTick();
	}, 1000 * getHz());
};

document
	.querySelector("#clockControl")
	.addEventListener("click", ({ target }) => {
		if (!clockStarted) {
			currentClock = scheduleClockTick();
			target.innerHTML = "Stop Clock";
			clockStarted = true;
		} else {
			clearTimeout(currentClock);
			currentClock = setTimeout(() => {}, 0);
			target.innerHTML = "Start Clock";
			clockStarted = false;
		}
	});

document.querySelector("#submitInstructions").addEventListener("click", () => {
	const inst = document
		.querySelector("#instructionInput")
		.value.toUpperCase()
		.split("\n");
	inst.forEach((element, i) => {
		if (i >= 7) {
			return;
		}
		rom.write(i, getOpCode(element));
	});
});
