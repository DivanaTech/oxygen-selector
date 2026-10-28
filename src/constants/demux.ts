import type { BinaryDigit, RoomConfig } from '../types';

export const ROOMS: RoomConfig[] = [
  { id: 0, name: 'ICU', address: '00', output: 'Y0' },
  { id: 1, name: 'Emergency', address: '01', output: 'Y1' },
  { id: 2, name: 'General Ward', address: '10', output: 'Y2' },
  { id: 3, name: 'Recovery', address: '11', output: 'Y3' }
];

export const EQUATIONS = [
  'Y₀ = I · S̅₁ · S̅₀', 'Y₁ = I · S̅₁ · S₀',
  'Y₂ = I · S₁ · S̅₀', 'Y₃ = I · S₁ · S₀'
];

export function calculateOutputs(input: BinaryDigit, s1: BinaryDigit, s0: BinaryDigit): boolean[] {
  return [
    input === 1 && s1 === 0 && s0 === 0,
    input === 1 && s1 === 0 && s0 === 1,
    input === 1 && s1 === 1 && s0 === 0,
    input === 1 && s1 === 1 && s0 === 1
  ];
}
