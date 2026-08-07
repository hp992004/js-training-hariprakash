import type { Intern } from '../types/intern';

class InternTracker {
  #interns: Intern[] = [];
  #apiUrl = '/api/interns';
  #lastFetchedAt = new Date(0);
  #localCache = new Map<number, Intern>();

  async loadAll(): Promise<void> {
    const res = await fetch(this.#apiUrl);
    this.#interns = await res.json();
    this.#lastFetchedAt = new Date();

    this.#localCache.clear();
    for (const intern of this.#interns) {
      this.#updateCache(intern);
    }
  }

  getAll(): readonly Intern[] {
    return this.#interns;
  }

  getById(id: number): Intern | undefined {
    return this.#localCache.get(id);
  }

  #buildUrl(id: number): string {
    return `${this.#apiUrl}/${id}`;
  }

  #updateCache(intern: Intern): void {
    this.#localCache.set(intern.id, intern);
  }

  updateScore(internId: number, score: number): void {
  if (score < 0 || score > 100) {
    throw new RangeError('Score must be between 0 and 100');
  }

  const intern = this.#interns.find((i) => i.id === internId);

  if (!intern) {
    throw new Error('Intern not found');
  }

  intern.score = score;
  this.#updateCache(intern);
}
}


export type { Intern };
export { InternTracker };
