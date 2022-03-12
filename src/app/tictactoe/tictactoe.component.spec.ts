import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WinConditionValidatorDirective } from '../win-condition-validator.directive';

import { Cell, TictactoeComponent } from './tictactoe.component';

describe('TictactoeComponent', () => {
  let component: TictactoeComponent;
  let fixture: ComponentFixture<TictactoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      declarations: [TictactoeComponent, WinConditionValidatorDirective]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TictactoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.mainForm).toBeDefined();
  });

  it('should create correct number of cells', () => {
    const comp = new TictactoeComponent();
    comp.GRID_SIZE = 5;
    comp.winCondition = 5;
    comp.startNewGame();
    expect(comp.cells.length).toBe(25)
  })

  it('case 1: 3 in row should return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0,1),new Cell(1,0,1),new Cell(2,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1),
      new Cell(0,2),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[2]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })

  it('3 in col should return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0,1),new Cell(1,0),new Cell(2,0),
      new Cell(0,1,1),new Cell(1,1),new Cell(2,1),
      new Cell(0,2),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[6]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })
  

  it('3 in diagonal should return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0,1),new Cell(1,0),new Cell(2,0),
      new Cell(0,1),new Cell(1,1,1),new Cell(2,1),
      new Cell(0,2),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[8]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })


  it('2 in row should not return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0,1),new Cell(1,0),new Cell(2,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1),
      new Cell(0,2),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[1]);
    expect(comp.finalResult).toBe(0)
  })

  it('Not 3 in row should not return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0,1),new Cell(1,0,1),new Cell(2,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1),
      new Cell(0,2),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[4]);
    expect(comp.finalResult).toBe(0)
  })

  it('3 in reverse should return win', () => {
    const comp = new TictactoeComponent();
    comp.cells = [
      new Cell(0,0),new Cell(1,0),new Cell(2,0),
      new Cell(0,1),new Cell(1,1,1),new Cell(2,1),
      new Cell(0,2,1),new Cell(1,2),new Cell(2,2),
    ]
    comp.pick(comp.cells[2]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })

  it('5 x 5 GRID , 3 in reverse should return win', () => {
    const comp = new TictactoeComponent();
    comp.GRID_SIZE = 5;    
    comp.cells = [
      new Cell(0,0),new Cell(1,0),new Cell(2,0),new Cell(3,0),new Cell(4,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1,1),new Cell(3,1),new Cell(4,1),
      new Cell(0,2),new Cell(1,2,1),new Cell(2,2),new Cell(3,2),new Cell(4,2),
      new Cell(0,3),new Cell(1,3),new Cell(2,3),new Cell(3,3),new Cell(4,3),
      new Cell(0,4),new Cell(1,4),new Cell(2,4),new Cell(3,4),new Cell(4,4),
    ]
    comp.pick(comp.cells[3]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })

  it('5 x 5 GRID , 3 in row should return win', () => {
    const comp = new TictactoeComponent();
    comp.GRID_SIZE = 5;    
    comp.cells = [
      new Cell(0,0),new Cell(1,0),new Cell(2,0),new Cell(3,0),new Cell(4,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1),new Cell(3,1),new Cell(4,1),
      new Cell(0,2),new Cell(1,2,1),new Cell(2,2,1),new Cell(3,2),new Cell(4,2),
      new Cell(0,3),new Cell(1,3),new Cell(2,3),new Cell(3,3),new Cell(4,3),
      new Cell(0,4),new Cell(1,4),new Cell(2,4),new Cell(3,4),new Cell(4,4),
    ]
    comp.pick(comp.cells[13]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })

  it('5 x 5 GRID , 3 in col should return win', () => {
    const comp = new TictactoeComponent();
    comp.GRID_SIZE = 5;    
    comp.cells = [
      new Cell(0,0),new Cell(1,0),new Cell(2,0),new Cell(3,0),new Cell(4,0),
      new Cell(0,1),new Cell(1,1,1),new Cell(2,1),new Cell(3,1),new Cell(4,1),
      new Cell(0,2),new Cell(1,2,1),new Cell(2,2),new Cell(3,2),new Cell(4,2),
      new Cell(0,3),new Cell(1,3),new Cell(2,3),new Cell(3,3),new Cell(4,3),
      new Cell(0,4),new Cell(1,4),new Cell(2,4),new Cell(3,4),new Cell(4,4),
    ]
    comp.pick(comp.cells[16]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })


  it('5 x 5 GRID , 3 in diagonal should return win', () => {
    const comp = new TictactoeComponent();
    comp.GRID_SIZE = 5;    
    comp.cells = [
      new Cell(0,0),new Cell(1,0),new Cell(2,0),new Cell(3,0),new Cell(4,0),
      new Cell(0,1),new Cell(1,1),new Cell(2,1),new Cell(3,1),new Cell(4,1),
      new Cell(0,2),new Cell(1,2,1),new Cell(2,2),new Cell(3,2),new Cell(4,2),
      new Cell(0,3),new Cell(1,3),new Cell(2,3,1),new Cell(3,3),new Cell(4,3),
      new Cell(0,4),new Cell(1,4),new Cell(2,4),new Cell(3,4),new Cell(4,4),
    ]
    comp.pick(comp.cells[23]);
    expect(comp.finalResult).toBe(comp.Result.Win)
  })

  
  
});
