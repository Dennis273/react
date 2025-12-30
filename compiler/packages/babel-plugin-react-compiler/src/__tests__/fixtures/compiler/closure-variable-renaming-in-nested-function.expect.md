
## Input

```javascript
import {useIdentity} from 'shared-runtime';

/**
 * Test case for GitHub issue #35342
 * This tests that when a variable in the parent scope gets renamed,
 * nested functions that capture it via context get the renamed reference.
 *
 * The key scenario is:
 * 1. Parent scope has variable `value`
 * 2. Due to scope collision, `value` may be renamed to `value$0`
 * 3. Nested function captures `value` in its context
 * 4. The context reference should be updated to use the renamed variable
 */
function useFoo() {
  // This variable will be captured by the nested function
  const value = useIdentity(42);

  // Create a scope block that may cause renaming
  {
    // This creates a new scope with potential name collision
    const value = useIdentity(100);

    // This nested function captures the outer `value`
    // Its context should reference the correctly renamed variable
    const callback = useIdentity(() => {
      return value + 1;
    });

    return [callback, value];
  }
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime";
import { useIdentity } from "shared-runtime";

/**
 * Test case for GitHub issue #35342
 * This tests that when a variable in the parent scope gets renamed,
 * nested functions that capture it via context get the renamed reference.
 *
 * The key scenario is:
 * 1. Parent scope has variable `value`
 * 2. Due to scope collision, `value` may be renamed to `value$0`
 * 3. Nested function captures `value` in its context
 * 4. The context reference should be updated to use the renamed variable
 */
function useFoo() {
  const $ = _c(5);

  useIdentity(42);

  const value_0 = useIdentity(100);
  let t0;
  if ($[0] !== value_0) {
    t0 = () => value_0 + 1;
    $[0] = value_0;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const callback = useIdentity(t0);
  let t1;
  if ($[2] !== callback || $[3] !== value_0) {
    t1 = [callback, value_0];
    $[2] = callback;
    $[3] = value_0;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
}

export const FIXTURE_ENTRYPOINT = {
  fn: useFoo,
  params: [],
};

```
      
### Eval output
(kind: ok) ["[[ function params=0 ]]",100]