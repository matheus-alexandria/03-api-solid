export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Max number of user check-ins reached.');
  }
}
