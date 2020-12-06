const zip = (a, b) => {
	return a.map((v, i) => [a[i], b[i]]);
};

const bin2dec = (data = []) => {
	return data
		.slice()
		.reverse()
		.reduce((total, value, idx) => total + Math.pow(2, idx) * value, 0);
};

const dec2bin = (number, bitlength) => {
	const bin = Array(bitlength).fill(0);
	for (let i = bin.length - 1; i >= 0 && number > 0; i--) {
		let delta = number % 2;
		bin[i] = delta === 1 ? 1 : 0;
		number = (number - delta) / 2;
	}
	return bin;
};
