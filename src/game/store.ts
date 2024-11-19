import { GameState } from "../types.ts";
import { WordStore } from "../words/store.ts";
import { InputStore } from "../input/store.ts";
import { WordGenerator } from "../words/generator.ts";
import { ParticleStore } from "../particles/store.ts";

export class GameStore {
  private _state: GameState = GameState.Starting;
  private _level: number = 1;
  private _wordStore: WordStore = new WordStore(new WordGenerator());
  private _inputStore: InputStore = new InputStore();
  private _particleStore: ParticleStore = new ParticleStore();

  get state(): GameState {
    return this._state;
  }

  get level(): number {
    return this._level;
  }

  get wordStore(): WordStore {
    return this._wordStore;
  }

  get inputStore(): InputStore {
    return this._inputStore;
  }

  get particleStore(): ParticleStore {
    return this._particleStore;
  }

  set state(value: GameState) {
    this._state = value;
  }

  set level(value: number) {
    this._level = value;
  }

  completeLevel() {
    this._level += 1;
    this.state = GameState.WaitingToStart;
  }
}
