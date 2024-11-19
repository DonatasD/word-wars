import {
  COLOR_DEFAULT,
  FONT_FAMILY_DEFAULT,
  FONT_SIZE_DEFAULT,
  FONT_UNIT_SIZE_DEFAULT,
} from "./constants.ts";
import { WordGenerator } from "./generator.ts";
import { Word } from "./word.ts";
import { WordStyle } from "../types.ts";

export class WordStore {
  private readonly generator: WordGenerator;
  private readonly words: Word[];

  constructor(generator: WordGenerator, words: Word[] = []) {
    this.words = words;
    this.generator = generator;
  }

  removeFirstByValue(value: string): Word[] {
    const index = this.words.findIndex((word) => word.text === value);
    if (index != -1) {
      return this.words.splice(index, 1);
    }
    return [];
  }

  addGenerated(ctx: CanvasRenderingContext2D) {
    const text = this.generator.generateWordText();
    const styles: WordStyle[] = Array.from({ length: text.length }, () => ({
      fontSize: FONT_SIZE_DEFAULT,
      color: COLOR_DEFAULT,
      fontFamily: FONT_FAMILY_DEFAULT,
      fontUnitSize: FONT_UNIT_SIZE_DEFAULT,
    }));
    const word = new Word(
      this.generator.generateWordPosition(ctx),
      text,
      styles,
      this.generator.generateWordVelocity(),
    );
    this.generator.generateWordText();
    this.words.push(word);
  }

  getWords() {
    return this.words;
  }

  isEmpty(): boolean {
    return !this.words.length;
  }
}
