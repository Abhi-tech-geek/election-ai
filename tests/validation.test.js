import { describe, it, expect } from 'vitest';
import { validateVoterAge } from '../src/utils/validation';

describe('Voter Age Validation Core Logic', () => {
  it('should return READY for age 18+', () => {
    const result = validateVoterAge('2000-01-01', new Date('2024-01-01'));
    expect(result.eligible).toBe(true);
    expect(result.status).toBe('READY');
  });

  it('should return ADVANCE for age 17', () => {
    const result = validateVoterAge('2007-01-01', new Date('2024-01-01'));
    expect(result.advance).toBe(true);
    expect(result.status).toBe('ADVANCE');
  });

  it('should return UNDERAGE for age < 17', () => {
    const result = validateVoterAge('2010-01-01', new Date('2024-01-01'));
    expect(result.eligible).toBe(false);
    expect(result.status).toBe('UNDERAGE');
  });
});
