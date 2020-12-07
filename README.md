# Final Project Computer Architecture

This is a CPU Emulator of a custom architecture designed for a class. We are a group of 3 Computer Science Students at CETYS Universidad, and are proud to present
this final project.


## Instalation

The emulator is hosted online at the github pages asociated with this repository: [Here is the link for the live demo](https://fangoh.github.io/final-project-Computer-Architecture/).

There are no additional setup needed for it to get working

## Usage

There are two ways of "loading" programs to the CPU:

  1.- The first one is to manually change the bits on the ROM, by clicking on individual bits they alternate between 1 (True) and 0 (False).
  
  2.- The second one is to write in the text area provided to interpret a set of instructions to perform.

Once the memory is set up, feel free to click on "Start Clock" to see it running.


## Technical Details about the architecture

### Instruction Set Summary

Currently, the CPU supports the following instructions:

* ADD#: 0 0 0 0 - Addition inmediate mode
* SUB#: 0 0 0 1 - Sustraction inmediate mode
* AND#: 0 0 1 0 - Logical AND inmediate mode
* OR#:  0 0 1 1 - Logical OR inmediate mode
* LDA#: 0 1 0 0 - Load to Accumulator innmediate mode
* MVA:  0 1 0 1 - Move from Accumulator to specified address
* MVR:  0 1 1 0 - Move from register to Accumulator
* ADD:  1 0 0 0 - Addition direct mode
* SUB:  1 0 0 1 - Substraction direct mode
* AND:  1 0 1 0 - Logical AND direct mode
* OR:   1 0 1 1 - Logical OR direct mode
* NOP:  1 1 1 1 - No operation

### The virtual Memory, Registers

The CPU works with the following memory/registers:

* PC - Typical program counter.
* MAR - Register to store the address to check next.
* ROM - For store the information of the program.
* RAM - To store values.
* MDR - To store the output from the memories.
* MIR - To store the operation to perform on the ALU.
* ACCUMULATOR - The register where operations results are done.

### Data format

We followed the *Big Endian* format consistenly, registers other than the ROM only store numeric values, so there is no need to parse there. 

On ROM, there are 8 bits, the first 4 are for the OPCODE of the instruction, meanwhile the other 4 represent a value or an address, depending on the OPCODE

### Timming issues and Performance

Keeping everything synchronized was a priority for the emulator to work, but thanks to clever code architecture, we were able to make an event-based code, not allowing things to work out of the order they were supposed to.

Performance-wise, the emulator can do the provided operations almost inmediately, the delay is meant to allow users to see the execution cycle. 