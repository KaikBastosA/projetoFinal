export class Insufficient_stock extends Error {
    constructor() {
      super('Resource not found')
    }
  }