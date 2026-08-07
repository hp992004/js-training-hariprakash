import { InternTracker } from '../services/intern-tracker';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('InternTracker.updateScore', () => {
  let tracker: InternTracker;

  beforeEach(() => {
    tracker = new InternTracker();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => [
          {
            id: 1,
            name: 'John',
            score: 70,
            role: 'Developer',
            isPresent: true,
          },
        ],
      })
    );
  });

  it('throws RangeError if score is out of 0–100 range', () => {
    expect(() => tracker.updateScore(1, -1)).toThrow(RangeError);
    expect(() => tracker.updateScore(1, 101)).toThrow(RangeError);
  });

  it('throws if the intern does not exist', () => {
    expect(() => tracker.updateScore(999, 80)).toThrow(
      'Intern not found'
    );
  });

  it('updates the score without exposing internal state', async () => {
    await tracker.loadAll();

    const intern = tracker.getAll()[0];

    tracker.updateScore(intern.id, 95);

    expect(tracker.getById(intern.id)?.score).toBe(95);
  });
});