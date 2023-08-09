import uuid from '../utils/uuid.ts';

export interface TubeI {
  age: number;
  company: string;
  visionDefect: string;
}

class Tube {
  age: TubeI['age'];
  company: TubeI['company'];
  visionDefect: TubeI['visionDefect'];
  id: string;

  constructor({ age, company, visionDefect }: TubeI) {
    this.id = uuid();
    this.age = age;
    this.company = company;
    this.visionDefect = visionDefect;
  }
  static generate() {
    const age = Math.floor(Math.random() * 100);
    const company = Math.random() > 0.5 ? 'A' : 'B';
    const visionDefect = Math.random() > 0.5 ? 'red' : 'green';
    return new Tube({ age, company, visionDefect });
  }
}

export default Tube;
