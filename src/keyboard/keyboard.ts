import { GameStore } from "../game/store.ts";
import { GameContext } from "../game/context.ts";
import { GameState } from "../types.ts";

export class Keyboard {
  store: GameStore;
  context: GameContext;

  constructor(store: GameStore, context: GameContext) {
    this.store = store;
    this.context = context;
  }

  init() {
    window.addEventListener("keypress", (e) => {
      const value = this.store.inputStore.getValue();
      switch (e.key) {
        case "Enter": {
          this.handleEnter();
          break;
        }
        case " ": {
          break;
        }
        default: {
          if (e.key.length === 1) {
            this.store.inputStore.setValue(
              this.context.inputContext,
              value + e.key.toLowerCase(),
            );
          }
        }
      }
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace": {
          this.handleBackSpace();
          break;
        }
      }
    });
  }

  private handleEnter() {
    switch (this.store.state) {
      case GameState.Idle: {
        this.store.state = GameState.Starting;
        break;
      }
      case GameState.InProgress: {
        const value = this.store.inputStore.getValue();
        if (value.length > 0) {
          this.store.inputStore.setValue(this.context.inputContext, "");
          const removedWords = this.store.wordStore.removeFirstByValue(value);
          removedWords.forEach((word) => {
            for (let i = 0; i < 100; i++) {
              this.store.particleStore.add({
                x: word.position.x,
                y: word.position.y,
              });
            }
          });
          if (this.store.wordStore.isEmpty()) {
            this.store.completeLevel();
          }
        }
        break;
      }
    }
  }

  private handleBackSpace() {
    const value = this.store.inputStore.getValue();
    this.store.inputStore.setValue(
      this.context.inputContext,
      value.substring(0, value.length - 1),
    );
  }
}
