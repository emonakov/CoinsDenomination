/**
 * Invalid input error class
 */
export default class NotValidError extends TypeError {
  constructor(message) {
    super(message || 'invalid input');
    this.name = 'NotValidError';
  }
}
