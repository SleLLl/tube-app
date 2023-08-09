import uuid from '../utils/uuid.ts';
import Tube from './Tube.ts';

interface Schema {
  age: Record<string, boolean>;
  company: Record<string, boolean>;
  visionDefect: Record<string, boolean>;
}

class Rack {
  id: string;
  private tubes: Map<string, Tube>;
  private schema: Schema = {
    age: {},
    company: {},
    visionDefect: {},
  };

  constructor(id?: string) {
    this.id = id || uuid();
    this.tubes = new Map();
  }

  private addToSchema(tube: Tube): void {
    Object.keys(this.schema).forEach((key) => {
      this.schema[key as keyof Schema][tube[key as keyof Tube]] = true;
    });
  }

  private removeFromSchema(tube: Tube): void {
    Object.keys(this.schema).forEach((key) => {
      delete this.schema[key as keyof Schema][tube[key as keyof Tube]];
    });
  }

  isValidToAdd(tube: Tube): boolean {
    return Object.keys(this.schema).every((key) => {
      return !this.schema[key as keyof Schema][tube[key as keyof Tube]];
    });
  }

  addTube(tube: Tube): void {
    if (this.isValidToAdd(tube)) {
      this.tubes.set(tube.id, tube);
      this.addToSchema(tube);
    } else {
      throw new Error('Invalid tube');
    }
  }

  removeTube(tube: Tube): void {
    this.tubes.delete(tube.id);
    this.removeFromSchema(tube);
  }

  hasTube(id: string): boolean {
    return this.tubes.has(id);
  }

  getTube(id: string): Tube | undefined {
    return this.tubes.get(id);
  }

  getAllTubes(): Tube[] {
    return Array.from(this.tubes.values());
  }

  isEmpty(): boolean {
    return this.tubes.size === 0;
  }
}

export default Rack;
