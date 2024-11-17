import { InputStore } from "./input/store.ts";
import { WordStore } from "./words/store.ts";

export class Keyboard {
  inputStore: InputStore;
  wordStore: WordStore;

  constructor(inputStore: InputStore, wordStore: WordStore) {
    this.inputStore = inputStore;
    this.wordStore = wordStore;
  }

  init() {
    window.addEventListener("keypress", (e) => {
      const value = this.inputStore.getValue();
      switch (e.key) {
        case "Enter": {
          if (value.length > 0) {
            this.inputStore.setValue("");
            this.wordStore.removeFirstByValue(value);
          }
          break;
        }
        case " ": {
          break;
        }
        default: {
          if (e.key.length === 1) {
            this.inputStore.setValue(value + e.key.toLowerCase());
          }
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace": {
          const value = this.inputStore.getValue();
          this.inputStore.setValue(value.substring(0, value.length - 1));
          break;
        }
      }
    });
  }
}
