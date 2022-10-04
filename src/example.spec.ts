function addNUmbers(num1, num2) {
  return num1 + num2;
}

describe('addNumbers', () => {
  test('adds two numbers', () => {
    expect(addNUmbers(2, 2)).toEqual(4);
  });
});
