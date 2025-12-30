
## Input

```javascript
import {useSyncExternalStore, useIdentity} from 'shared-runtime';

/**
 * Test case for GitHub issue #35342
 * When an inner function is outlined to module scope, and it captures a
 * variable from its parent closure that gets renamed (e.g., setStore to setStore$0),
 * the outlined function should use the renamed variable.
 *
 * Before the fix: The outlined _temp function would still reference `setStore`
 * (the original name), causing "ReferenceError: setStore is not defined"
 *
 * After the fix: The context variables of the inner function are visited during
 * the renaming pass, so they correctly reference the renamed variable.
 */
function useFoo() {
  const setStore = useIdentity((x) => x);
  // Create another `setStore` variable to force renaming
  const setStore2 = useIdentity((x) => x + 1);

  // This function will be outlined because it has no context dependencies
  // on reactive variables, but it does capture `setStore` from the parent scope
  const callback = useIdentity(() => {
    // This should reference the correctly renamed setStore variable
    return setStore(42);
  });

  return [callback, setStore2];
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
import { useSyncExternalStore, useIdentity } from "shared-runtime";

/**
 * Test case for GitHub issue #35342
 * When an inner function is outlined to module scope, and it captures a
 * variable from its parent closure that gets renamed (e.g., setStore to setStore$0),
 * the outlined function should use the renamed variable.
 *
 * Before the fix: The outlined _temp function would still reference `setStore`
 * (the original name), causing "ReferenceError: setStore is not defined"
 *
 * After the fix: The context variables of the inner function are visited during
 * the renaming pass, so they correctly reference the renamed variable.
 */
function useFoo() {
  const $ = _c(5);
  const setStore = useIdentity(_temp);

  const setStore2 = useIdentity(_temp2);
  let t0;
  if ($[0] !== setStore) {
    t0 = () => setStore(42);
    $[0] = setStore;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const callback = useIdentity(t0);
  let t1;
  if ($[2] !== callback || $[3] !== setStore2) {
    t1 = [callback, setStore2];
    $[2] = callback;
    $[3] = setStore2;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
}
function _temp2(x_0) {
  return x_0 + 1;
}
function _temp(x) {
  return x;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```
      
### Eval output
(kind: ok) ["[[ function params=0 ]]","[[ function params=1 ]]"]