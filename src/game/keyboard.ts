import { Input } from "../input.ts";

export class Keyboard {
  input: Input;

  constructor(input: Input) {
    this.input = input;
  }

  init() {
    window.addEventListener("keypress", (e) => {
      console.log(e);
      switch (e.key) {
        case "Enter": {
          if (this.input.getValue().length > 0) {
            this.input.setValue("");
            // TODO submit
          }
          break;
        }
        default: {
          if (e.key.length === 1) {
            this.input.setValue(this.input.getValue() + e.key);
          }
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace": {
          const value = this.input.getValue();
          this.input.setValue(value.substring(0, value.length - 1));
          break;
        }
      }
    });
  }
}
