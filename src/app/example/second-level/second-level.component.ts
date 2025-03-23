import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ThirdLevelComponent } from '../third-level/third-level.component';
import { ChildData } from '../child-data.type';

@Component({
  selector: 'app-second-level',
  imports: [CommonModule, ThirdLevelComponent],
  styles: `
    :host {
      display: flex;
      margin: 8px;
      align-items: center;
      flex-direction: column;
      color: #fff;
      border-radius: 10px;
      border: 1px solid #000;
      background: #478a8a;
    }

    strong {
      padding: 16px;
    }

    .children {
      display: flex;
    }
  `,
  template: `
    <strong>{{ childData.label }}</strong>
    <span>{{ visualizeChangeDetectionRan() }}</span>
    <div class='children'>
      @for (data of childData.children; track data) {
        <app-third-level
          [childData]='data'
        ></app-third-level>
      }
    </div>
  `,
  standalone: true,
})
export class SecondLevelComponent implements OnInit {

  @Input() public childData!: ChildData;

  track = (i: any) => i;

  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  mark() {}

  ngOnInit(): void {}

  public visualizeChangeDetectionRan(): void {
    this.zone.runOutsideAngular(() => {
      this.elementRef.nativeElement.classList.add('detecting');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('detecting');
      }, 1000);
    });
  }

}
