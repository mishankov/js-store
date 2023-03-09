import { Store } from "./store.ts";

const a = new Store(6, () => console.log("Smbd subbed"));

const unsub1 = a.subscribe(
  (value) => {
    console.log(`unsub1: a changed to ${value}`);
    // a.update((n) => n + 1); // stack overflow
  },
  () => console.log("unsub1: unsubbed")
);

a.set(5);
a.update((n) => n + 1);

const unsub2 = a.subscribe(
  (value) => {
    console.log(`unsub2: a changed to ${value}`);
  },
  () => console.log("unsub2: unsubbed")
);

a.update((n) => n + 1);

unsub1();

a.update((n) => n + 1);

unsub2();
