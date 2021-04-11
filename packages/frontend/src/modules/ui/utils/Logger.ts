export default class Logger {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  warn(message: string) {
    console.warn(`[${this.name}] ${message}`);
  }
}
