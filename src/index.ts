import { Observable, Subject, filter, of, reduce } from "rxjs";

/* What's going on here bro? I immediately need to understand the all logics about
the reactive programming. */
const observable_1 = new Observable((subscriber) => {
  //console.log("observable callable param invoked. subscriber: ", subscriber);
  //subscriber.next("My first observable.");

  try {
    subscriber.next("Observable val 1");
    subscriber.next("Observable val 2");
    subscriber.next("Observable val 3");
    subscriber.complete();
  } catch (e) {
    subscriber.error(e);
  }
});

observable_1.subscribe((x) => console.log(">> x:", x));
observable_1.subscribe((y) => console.log(">> y:", y));
observable_1.subscribe((z) => console.log(">> z:", z));
observable_1.subscribe((k) => console.log(">> k:", k));

observable_1.subscribe({
  next: (m) => console.log(">> m: ", m),
  error: (e) => console.log(">> e: ", e),
  complete: () => console.log("Observable is complete"),
});

setTimeout(() => {
  observable_1.subscribe((m) => console.log(">> timeout m", m));
}, 1e3);

// There are lots of ways for creating an Observable from any value set.
let observable_2 = of(1, 2, 3, 4);

/* pip() function takes another functions as parameter and invokes these one by one.
As you can see these functions are similar to array functions but coming from rxjs lib.
These functions are special functions. */
let observable_3 = observable_2.pipe(
  filter((x) => x % 2 === 0),
  reduce((acc, current) => acc + current, 0)
);

observable_3.subscribe((result) => console.log("result: ", result));

const pipe_functions_1 = [
  filter((x: number) => x % 2 === 0),
  reduce((acc, current: number) => acc + current, 0),
];

let observable_7 = observable_2.pipe(
  pipe_functions_1[0],
  pipe_functions_1[1]
  // pipe_functions_1[2]
);
observable_7.subscribe((result) => console.log("result: ", result));

/// Subject

/* Subject is a special kind of Observer. It is extending Observer and adding
next(), error(), complete() and unsubscribe() methods. */
const subject_1 = new Subject();
subject_1.subscribe({
  next: (v) => console.log(`1- From subject: ${v}`),
});

subject_1.subscribe({
  next: (v) => console.log(`2- From subject: ${v}`),
});

subject_1.next(5);
subject_1.next(6);

// When we complete a subject than the next methods won't execute.
subject_1.complete();

// These won't work because we completed the subject.
subject_1.next(7);
subject_1.next(8);
