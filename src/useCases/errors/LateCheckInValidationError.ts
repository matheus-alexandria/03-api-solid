export class LateCheckInValidationError extends Error {
  constructor() {
    super('Check ins can only be validated after 20 minutes of its creation.');
  }
}
