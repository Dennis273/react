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
