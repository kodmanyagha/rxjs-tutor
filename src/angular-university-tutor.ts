import {
  from,
  interval,
  map,
  of,
  reduce,
  scan,
  shareReplay,
  take,
  tap,
} from "rxjs";

/*

Tutorial here: https://t.co/CDj3IeRIm7

*/

const observable_1 = interval(500).pipe(
  take(5),
  tap((val) => console.log("tap val:", val))
);

/*
If we run this program, you might be surprised by the fact that nothing
gets printed to the console! This is because of one of the main properties
of this type of Observable.

If this plain Observable has no subscribers, it will not be triggered!

The observable is said to be cold because it does not generate new values
if no subscriptions exist. To get the numeric values printed to the console,
we need to subscribe to the Observable:

With this, we do get the numeric values printed to the console. But what
happens if we add two subscribers to this observable:
*/

//observable_1.subscribe();
observable_1.subscribe((val) => console.log("observer 1 received", val));
observable_1.subscribe((val) => console.log("observer 2 received", val));

/*
Multiple subscribers can subscribe to a single observer object. Yes, this is
interesting thing.

An observable is just a definition, a blueprint of how a functional processing
chain of operators should be set up from the source of the event up until
the sink of the event, when that sink (the observer) is attached.
*/

const observable_2 = interval(500)
  .pipe(take(5))
  .pipe(map((i) => 2 * i));
observable_2.subscribe((result) => console.log("observable_2 result", result));

const reduced_observable_1 = of(1, 2, 3, 4, 5, 6).pipe(
  reduce((state, val) => state + val, 0)
);
reduced_observable_1.subscribe((total) => console.log("total: ", total));

const reduced_observable_2 = from([1, 2, 3, 4, 5, 6, 7, 8]).pipe(
  reduce((state, val) => state * val, 1)
);
reduced_observable_2.subscribe((result) =>
  console.log("reduced_observable_2 result", result)
);

/* reduce() function is returns only the result. But if we want to receive all
values we must use scan() function. */

const scan_obs_3 = interval(0)
  .pipe(take(5))
  .pipe(scan((state, val) => state + val, 0));

scan_obs_3.subscribe((result) => console.log("scan obs 3 result", result));

/* When we subscribe to an observable, it triggers the instantiation of
a separate processing chain. The 'share' operator allows us to share
a single subscription of a processing chain with other subscribers. */

const share_obs_1 = interval(0).pipe(
  take(5),
  tap((val) => console.log("share obs val", val)),
  shareReplay()
);

share_obs_1.subscribe((val) =>
  console.log("share obs 1 subscription 1 val", val)
);

share_obs_1.subscribe((val) =>
  console.log("share obs 1 subscription 2 val", val)
);

/*
We can see the side effect inside the tap call is only printed once instead of twice.

*/
