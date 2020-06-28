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

describe('checkVerticalWin', () => {
  const board1 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', 'X', '-', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-']
  ];
  const board2 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-']
  ];

  it('should detect a win of four consecutive alike pieces in a column', () => {
    const win = checkForWin.checkVerticalWin(board1, 2, 4);

    expect(win).to.equal('X');
  });

  it('should not detect a win if there is not one', () => {
    const noWin = checkForWin.checkVerticalWin(board2, 5, 4);

    expect(noWin).to.equal(undefined);
  });
});

describe('checkDiagonalAscWin', () => {
  const board1 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', 'X'],
    ['-', '-', '-', '-', 'X', 'X', 'Y'],
    ['-', '-', '-', '-', 'X', 'Y', 'Y'],
    ['-', '-', '-', 'X', 'X', 'Y', 'Y']
  ];
  const board2 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', 'X', '-', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-'],
    ['-', '-', '-', '-', 'X', 'Y', '-']
  ];

  it('should detect a win of four consecutive alike pieces diagonally ascending', () => {
    const win = checkForWin.checkDiagonalAscWin(board1, 4, 4);

    expect(win).to.equal('X');
  });

  it('should not detect a win if there is not one', () => {
    const noWin = checkForWin.checkDiagonalAscWin(board2, 4, 4);

    expect(noWin).to.equal(undefined);
  });
});

describe('checkDiagonalDescWin', () => {
  const board1 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', 'Y', '-', '-', 'X'],
    ['-', '-', '-', 'Y', 'Y', 'X', 'X'],
    ['-', '-', '-', 'X', 'X', 'Y', 'Y'],
    ['-', '-', '-', 'X', 'X', 'Y', 'Y']
  ];
  const board2 = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', '-', '-', '-', 'X', 'X', 'Y'],
    ['-', '-', '-', '-', 'X', 'Y', 'Y'],
    ['-', '-', '-', 'X', 'X', 'Y', 'Y']
  ];

  it('should detect a win of four consecutive alike pieces in a column', () => {
    const win = checkForWin.checkDiagonalDescWin(board1, 3, 4);

    expect(win).to.equal('Y');
  });

  it('should not detect a win if there is not one', () => {
    const noWin = checkForWin.checkDiagonalDescWin(board2, 4, 4);

    expect(noWin).to.equal(undefined);
  });
});

describe('checkTie', () => {
  it('should detect a tie if all spaces filled and are not 4 alike pieces in a row at all', () => {
    const tie = checkForWin.checkTie(42);

    expect(tie).to.equal('TIE GAME');
  });

  it('should not detect a tie if turnsTaken is less than 42', () => {
    const noTie = checkForWin.checkTie(41);

    expect(noTie).to.equal(undefined);
  });
});
