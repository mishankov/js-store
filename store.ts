export class Store<T> {
  value: T;
  currentSubId: number;
  subscribers: {
    id: number;
    subCallback: (value: T) => void;
    unsubCallback: () => void;
  }[];
  subCallback: () => void;

  constructor(initial: T, subCallback: () => void) {
    this.subscribers = [];
    this.currentSubId = 0;
    this.subCallback = subCallback;
    this.value = initial;
  }

  set(value: T) {
    this.value = value;
    this._notifySubscribers();
  }

  update(updater: (value: T) => T) {
    this.value = updater(this.value);
    this._notifySubscribers();
  }

  get() {
    return this.value;
  }

  subscribe(subCallback: (value: T) => void, unsubCallback: () => void) {
    this.currentSubId++;
    this.subscribers.push({
      id: this.currentSubId,
      subCallback: subCallback,
      unsubCallback: unsubCallback,
    });
    if (this.subCallback !== undefined) {
      this.subCallback();
    }
    const subToDelete = this.currentSubId;
    return () => {
      this.subscribers = this.subscribers.filter((sub) => {
        const res = sub.id !== subToDelete;
        if (res === false)
          if (sub.unsubCallback !== undefined) sub.unsubCallback();
        return res;
      });
    };
  }

  _notifySubscribers() {
    this.subscribers.forEach((sub) => sub.subCallback(this.value));
  }
}
