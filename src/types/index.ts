export type BinaryDigit = 0 | 1;
export type DemuxState = { input: BinaryDigit; s1: BinaryDigit; s0: BinaryDigit };
export type RoomConfig = { id: number; name: string; address: string; output: `Y${0 | 1 | 2 | 3}` };
