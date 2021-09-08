import { forkJoin, from, of } from 'rxjs';

import { map, concatAll, filter } from 'rxjs/operators';
async function getNRRD() {
  let header = await fetch('https://httpbin.org/status/500');
  console.log(header);
  return new Uint8Array(10);
}

//emit array as a sequence of values
const arraySource = from(getNRRD()).pipe(
  map(binaryBitmap => {
    if (binaryBitmap) {
      console.log('binary : ', binaryBitmap);
      return fetch('https://httpbin.org/status/500');
    }
    return of(undefined);
  }),
  concatAll()
);

let observables = [arraySource];

forkJoin(observables).subscribe({
  next: () => {
    console.log('success');
  },
  error: (reason: any) => {
    // print to the console
    console.error(reason);
  }
});
