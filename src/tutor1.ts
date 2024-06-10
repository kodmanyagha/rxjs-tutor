import { catchError, iif, interval, map, of, take } from "rxjs";

const observable1 = interval(555).pipe(
  take(5),
  map((item) => {
    console.log("interval item: ", item);
  }),
  catchError((err) => {
    console.log("Error: ", err);

    return of(err);
  })
);

observable1.subscribe({
  next: (val) => console.log(val),
  error: (err) => console.log(err),
});

let condition: boolean;

/* iif: Takes three params: condition, observable1, observable2. Executes
condition function before subscription, than if the condition true returns
first observable, if condition is false returns second observable. */
const iifObservable1 = iif(() => condition, of("first"), of("second"));

condition = true;
iifObservable1.subscribe((item) => console.log(item));

condition = false;
iifObservable1.subscribe((item) => console.log(item));
