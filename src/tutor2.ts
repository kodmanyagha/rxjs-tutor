import { from } from "rxjs";

const obs1 = from(["foo", "bar", "baz"]);

obs1.subscribe({
  next: (item) => {
    console.log(item);
  },
});
