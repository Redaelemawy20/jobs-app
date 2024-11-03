export default class TitleCache {
  private capacity: number;
  private titles: string[];
  private titleSet: Set<string>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.titles = [];
    this.titleSet = new Set<string>();
  }

  add(title: string): void {
    if (this.titleSet.has(title)) {
      this.moveToEnd(title);
    } else {
      if (this.titles.length >= this.capacity) {
        const oldestTitle = this.titles.shift();
        if (oldestTitle) this.titleSet.delete(oldestTitle);
      }
      this.titles.push(title);
      this.titleSet.add(title);
    }
  }
  getTitles(): string[] {
    return [...this.titles];
  }
  private moveToEnd(title: string): void {
    const index = this.titles.indexOf(title);
    if (index > -1) this.titles.splice(index, 1);
    this.titles.push(title);
  }
}
