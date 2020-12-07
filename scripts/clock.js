let delay = 500; //document.getElementById("")

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

// components: mdr, ram, rom, mar, pc, alu, acc, mir
const getClock = (components) => {
	const controlUnit = getControlUnit();
	const { mdr, ram, rom, mar, pc: pc_, alu, acc, mir } = components;

	const tick = () => {
		const input = rom.read(bin2dec(pc_.read())).slice(0, 4);
		[
			mdr_rw,
			mdr_mux,
			ram_rw,
			rom_en,
			mar_en,
			mar_mux,
			pc_en,
			alu_mux,
			alu_en,
			acc_mux,
			mir_en,
		] = controlUnit.tick(input);

		pc_.update({ en: pc_en, components });
		mir.update({ en: mir_en, components });

		mdr.update({ en: mdr_rw, mux: mdr_mux, components });
		ram.update({ en: ram_rw, components });
		rom.update({ en: rom_en, components });
		mar.update({ en: mar_en, mux: mar_mux, components });
		alu.update({ en: alu_en, mux: alu_mux, components });
		acc.update({ en: alu_en, mux: acc_mux, components });
	};

	return {
		tick: tick,
	};
};
