import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ChildData } from '../child-data.type';

@Component({
  selector: 'app-third-level',
  imports: [CommonModule],
  standalone: true,
  styles: `
    :host {
      display: flex;
      margin: 8px;
      text-align: center;
      align-items: center;
      flex-direction: column;
      color: #fff;
      border: 1px solid #000;
      border-radius: 10px;
      background: #267373;
    }

    strong {
      padding: 16px;
    }

  `,
  template: `
    <strong>{{ childData.label }}</strong>
    <button (click)='mark()'>mark</button>
    <span>{{ visualizeChangeDetectionRan() }}</span>
  `,
})
export class ThirdLevelComponent implements OnInit {
  @Input() public childData!: ChildData;

  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  ngOnInit(): void {
  }

  public mark() {

  }

  public visualizeChangeDetectionRan(): void {
    this.zone.runOutsideAngular(() => {
      this.elementRef.nativeElement.classList.add('detecting');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('detecting');
      }, 1000);
    });
  }
}
