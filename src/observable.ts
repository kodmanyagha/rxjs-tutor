import { EMPTY, Subject, from, interval, take } from "rxjs";

const array = [1, 2, 3, 4, 5];
const empty_1 = EMPTY;
empty_1.subscribe((item) => console.log(item));

const observable_6 = from(array);

observable_6.subscribe((value) => {
  console.log("1- obs 6: " + value);
});
observable_6.subscribe((value) => {
  console.log("2- obs 6: " + value);
});
observable_6.subscribe((value) => {
  console.log("3- obs 6: " + value);
});

const subject_2 = new Subject();
const observable_8 = subject_2.pipe(take(2));
observable_8.subscribe((item) => console.log("obs 8 item", item));

subject_2.subscribe((value) => {
  console.log("1- subj 6: " + value);
});
subject_2.subscribe((value) => {
  console.log("2- subj 6: " + value);
});
subject_2.subscribe((value) => {
  console.log("3- subj 6: " + value);
});

["foo", "bar", "baz", "qux"].forEach((item) => subject_2.next(item));
subject_2.complete();
subject_2.next("kuu");

//subject_2.next("foo");
//subject_2.next("bar");
//subject_2.next("baz");
//subject_2.next("qux");

const observable_7 = interval(500).pipe(take(5));
observable_7.subscribe((val) => {
  console.log(val);
});

from([2, 3, 4, 5, 6, 7, 8])
  .pipe(take(3))
  .subscribe((item) => {
    console.log("on the fly item", item);
  });
