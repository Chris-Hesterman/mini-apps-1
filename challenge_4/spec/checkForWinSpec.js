describe('checkHorizontalWin', () => {
  const board1 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', 'Y', 'Y', 'Y', '-', '-'],
    ['-', '-', 'X', 'X', 'X', 'X', '-']
  ];

  const board2 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', 'Y', 'Y', 'Y', '-', '-'],
    ['-', '-', 'X', 'X', 'X', '-', '-']
  ];

  it('should detect a win if four consecutive alike pieces are in a row', () => {
    const win = checkForWin.checkHorizontalWin(board1, 5, 5);

    expect(win).to.equal('X');
  });
  it('should not detect a win if there is not one', () => {
    const noWin = checkForWin.checkHorizontalWin(board2, 5, 4);

    expect(noWin).to.equal(undefined);
  });
});
