export class Storage<T> {
  private store = new Map<string, T>();

  public getItem(key: string): T | undefined {
    return this.store.get(key);
  }

  public setItem(key: string, value: T) {
    this.store.set(key, value);
  }

  public removeItem(key: string) {
    this.store.delete(key);
  }
}
