import { Observable, OperatorFunction, Subject, from, of } from "rxjs";

function calculateTotal(no1: number, no2: number): number {
  return no1 + no2;
}

const result = calculateTotal(10, 20);
console.log(">>  result", result);

const arr1 = [10, 20, 30, 40];

let total = 0;
arr1.forEach((item) => {
  console.log(total);
  total += item;
});
console.log(">>  total", total);

const data = [10, 20, 30];

const observable1 = new Observable((subscriber) => {
  const apiResult = ["foo", "bar", "baz"];

  apiResult.forEach((apiResultItem) => subscriber.next(apiResultItem));

  //subscriber.complete();

  subscriber.next();
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(33);
  subscriber.complete();
});

observable1.subscribe((item) => console.log("subscriber 1 item: ", item));
observable1.subscribe((item) => console.log("subscriber 2 item: ", item));
observable1.subscribe((item) => console.log("subscriber 3 item: ", item));
observable1.subscribe((item) => console.log("subscriber 4 item: ", item));
observable1.subscribe((item) => console.log("subscriber 5 item: ", item));

const observable2 = from(arr1);
observable2.subscribe((arr1Item) => {
  console.log("arr1 item:", arr1Item);
});

const observable3 = from([{ foo: "foo", bar: "bar" }]);

const observable4 = new Observable();
observable4.subscribe((item) => console.log(item));

const customPipeableOperator = <T>(): OperatorFunction<T, T> => {
  return function <T>(source: Observable<T>): Observable<T> {
    return new Observable((subscriber) => {
      source.subscribe({
        next: (data) => {
          subscriber.next(data);
        },
        complete: () => subscriber.complete(),
        error: (err) => subscriber.error(err),
      });
    });
  };
};

// TODO Fill here.
const observable5 = of(1, 2, 3, 4, 5, 6);
observable5
  .pipe(
    (sourceObservable) => {
      let counter = 0;

      const subject = new Subject();
      sourceObservable.subscribe({
        next: (dataNext) => {
          if (++counter > 2) {
            subject.complete();
            return;
          }
          console.log(">>  file: example.ts:65  dataNext", dataNext);
          subject.next(dataNext);
        },
        complete: () => {
          console.log(">> sourceObservable complete event triggered");
          subject.complete();
        },
        error: (dataErr) => {
          console.log(">>  file: example.ts:74  dataErr", dataErr);
          subject.error(dataErr);
        },
      });
      console.log(
        ">>  file: example.ts:78  sourceObservable",
        sourceObservable
      );

      //return new Observable((foo) => {});
      // return of(11111, 22222, 33333);
      return subject.asObservable();
    },
    //
    customPipeableOperator()
  )
  .subscribe((data) => {
    console.log("observable5 data:", data);
  });
