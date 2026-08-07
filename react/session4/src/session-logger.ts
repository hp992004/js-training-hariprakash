interface ISessionLogger {
  /**
   * Records that an intern attended the session.
   */
  recordAttendance(internId: number): void;

  /**
   * Returns true if the intern attended the session.
   */
  hasAttended(internId: number): boolean;

  /**
   * Returns the total number of attendees.
   */
  getAttendeeCount(): number;

  /**
   * Returns a read-only list of attendee IDs.
   */
  getAttendeeIds(): readonly number[];
}

export class SessionLogger implements ISessionLogger {
  #attendees = new Set<number>();

  recordAttendance(internId: number): void {
    this.#attendees.add(internId);
  }

  hasAttended(internId: number): boolean {
    return this.#attendees.has(internId);
  }

  getAttendeeCount(): number {
    return this.#attendees.size;
  }

  getAttendeeIds(): readonly number[] {
    return [...this.#attendees];
  }
}