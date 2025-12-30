
## Input

```javascript
/**
 * Test case from GitHub issue #35342 (dennis273)
 *
 * The closure `() => getSetting()` is hoisted to module scope as `_temp`,
 * but `getSetting` is only accessible inside `createApp`. The compiler
 * should ensure that context variables are properly renamed so the hoisted
 * function references the correct variable.
 *
 * Before fix: ReferenceError: getSetting is not defined
 * After fix: The hoisted function correctly references the renamed variable
 */
export const createApp = (deps) => {
  const {getSetting} = deps;

  const Component = () => {
    console.log({fn: () => getSetting()});
    return <div />;
  };

  return Component;
};

export const FIXTURE_ENTRYPOINT = {
  fn: createApp,
  params: [{getSetting: () => 'test-setting'}],
};

```

## Code

```javascript
import { c as _c } from "react/compiler-runtime"; /**
 * Test case from GitHub issue #35342 (dennis273)
 *
 * The closure `() => getSetting()` is hoisted to module scope as `_temp`,
 * but `getSetting` is only accessible inside `createApp`. The compiler
 * should ensure that context variables are properly renamed so the hoisted
 * function references the correct variable.
 *
 * Before fix: ReferenceError: getSetting is not defined
 * After fix: The hoisted function correctly references the renamed variable
 */
export const createApp = (deps) => {
  const $ = _c(2);
  const { getSetting } = deps;
  let t0;
  if ($[0] !== getSetting) {
    t0 = () => {
      console.log({ fn: () => getSetting() });
      return <div />;
    };
    $[0] = getSetting;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const Component = t0;
  return Component;
};

export const FIXTURE_ENTRYPOINT = {
  fn: createApp,
  params: [
    {
      getSetting: () => {
        return "test-setting";
      },
    },
  ],
};

```
      
### Eval output
(kind: ok) "[[ function params=0 ]]"