import { InputStore } from "./input/store.ts";
import { WordStore } from "./words/store.ts";
import { ParticleStore } from "./particles/store.ts";

export class Keyboard {
  inputStore: InputStore;
  wordStore: WordStore;
  particleStore: ParticleStore;

  constructor(
    inputStore: InputStore,
    wordStore: WordStore,
    particleStore: ParticleStore,
  ) {
    this.inputStore = inputStore;
    this.wordStore = wordStore;
    this.particleStore = particleStore;
  }

  init(ctx: CanvasRenderingContext2D) {
    window.addEventListener("keypress", (e) => {
      const value = this.inputStore.getValue();
      switch (e.key) {
        case "Enter": {
          if (value.length > 0) {
            this.inputStore.setValue(ctx, "");
            const removedWords = this.wordStore.removeFirstByValue(value);
            removedWords.forEach((word) => {
              for (let i = 0; i < 100; i++) {
                this.particleStore.add({
                  x: word.position.x,
                  y: word.position.y,
                });
              }
            });
          }
          break;
        }
        case " ": {
          break;
        }
        default: {
          if (e.key.length === 1) {
            this.inputStore.setValue(ctx, value + e.key.toLowerCase());
          }
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace": {
          const value = this.inputStore.getValue();
          this.inputStore.setValue(ctx, value.substring(0, value.length - 1));
          break;
        }
      }
    });
  }
}
