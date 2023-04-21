export class TF2CostParsingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TF2CostParsingError";
  }
}
