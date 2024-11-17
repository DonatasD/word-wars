export class InputStore {
  private value: string;

  constructor(value: string = "") {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }
}
