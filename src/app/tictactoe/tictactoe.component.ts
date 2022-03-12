import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Square } from '../Model/Square.model';

@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})

export class TictactoeComponent implements OnInit {
  protected cellSize: number = 10;

  @ViewChild('mainForm') mainForm: NgForm | undefined;
  @HostBinding("style.--board-size") GRID_SIZE: number = 3;
  @HostBinding("style.--cell-size") cell_SIZE: string = `${this.cellSize}vmin`;

  cells: Cell[] = [];
  startGame: boolean = false;
  gameEnd: boolean = false;
  winCondition: Number = 3;
  finalResult: number = 0;
  currentPlayer: number = 1;
  playerCount: number = 2;
  Player = Players
  Result = Result;

  constructor() { }

  ngOnInit(): void {
    this.generateCells();
  }

  pick(selected: Cell): void {
    if (selected.Player) return;
    if (this.gameEnd) return;
    selected.Player = this.currentPlayer;
    if (!this.continueGame()) return;
    this.currentPlayer = (this.currentPlayer == 1 ? 2 : 1);
  }

  startNewGame(): void {
    this.startGame = true;
    this.generateCells();
  }

  endCurrentGame(): void {
    this.startGame = false;
    this.currentPlayer = Players['Player 1'];
    this.gameEnd = false;
    this.finalResult = 0;
    this.generateCells();
  }

  private generateCells(): void {
    this.cells = Array.from(Array(this.GRID_SIZE * this.GRID_SIZE)).map((_value, index) => new Cell(index % this.GRID_SIZE, index / this.GRID_SIZE));
  }

  private continueGame(): boolean {
    const board = this.convertToMultiArray();
    this.gameEnd = this.checkPlayerWin(board);
    if (this.gameEnd) {
      this.finalResult = Result.Win;
    }
    if (this.cells.every(s => s.Player)) {
      this.finalResult = Result.Draw;
    }
    // only continue if result is not draw or win
    return [Result.Draw, Result.Win].every(r => r !== this.finalResult);

  }


  private checkPlayerWin(board: number[][]): boolean {
    const indexArr = Array.from(Array(this.GRID_SIZE)).map((_value, index) => index);
    let win = indexArr.some((row) => this.checkWinConditionFulfilled(board, 0, 0, row, ModeDelta.Row));
    if (win) return win;
    win = indexArr.some((col) => this.checkWinConditionFulfilled(board, 0, col, 0, ModeDelta.Col));
    if (win) return win;
    win = indexArr.some((diagonal) => this.checkWinConditionFulfilled(board, 0, diagonal, 0, ModeDelta.Diagonal) || this.checkWinConditionFulfilled(board, 0, 0, diagonal, ModeDelta.Diagonal));
    if (win) return win;
    win = indexArr.some((value) => this.checkWinConditionFulfilled(board, 0, value, this.GRID_SIZE - 1, ModeDelta.Reverse) || this.checkWinConditionFulfilled(board, 0, 0, (this.GRID_SIZE - 1) - value, ModeDelta.Reverse));
    return win;
  }

  private convertToMultiArray(): number[][] {
    //convert cell list to multi-dimension array
    return Array.from(Array(this.GRID_SIZE)).reduce((result, arr, index) => {
      result[index] = this.cells.filter(s => s.Y == index).sort((a, b) => a.X - b.X).map(s => s.Player);
      return result;
    }, []);
  }

  private checkWinConditionFulfilled(grid: number[][], matchedCount: number, x: number, y: number, delta: { X: number, Y: number }): boolean {
    if (matchedCount === this.winCondition) return true //esscape when winning condition is fulfilled
    if (x < 0) return false; //escape when col become negative
    if (y < 0) return false; //escape when col become negative
    if (x > this.GRID_SIZE) return false; //escape when col out of range
    if (y > this.GRID_SIZE) return false; //escape when row out of range
    if (grid[y] == undefined) return false; //escape when index out of range
    if (grid[y][x] !== this.currentPlayer) matchedCount = 0; //reset match count if cell value is not current player
    if (grid[y][x] === this.currentPlayer) matchedCount++; //match count + 1 if cell value is current player
    //set tranverse direction based on mode delta
    return this.checkWinConditionFulfilled(grid, matchedCount, x + delta.X, y + delta.Y, delta);
  }
}

export class Cell extends Square {
  Player?: number;
  constructor(x: number, y: number, player?: number) {
    super(x, y);
    this.Player = player;
  }
}

enum Players {
  'Player 1' = 1,
  'Player 2' = 2
}


enum Result {
  'Win' = 1,
  'Lose' = 2,
  'Draw' = 3
}


const ModeDelta = {
  Col: { X: 0, Y: 1 },
  Row: { X: 1, Y: -1 },
  Diagonal: { X: 1, Y: 1 },
  Reverse: { X: 1, Y: 0 },
}
