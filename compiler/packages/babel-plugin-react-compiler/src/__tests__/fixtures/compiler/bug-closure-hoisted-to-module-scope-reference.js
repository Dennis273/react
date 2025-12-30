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
