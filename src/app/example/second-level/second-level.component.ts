import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ChildData } from '../child-data.type';
import { ThirdLevelComponent } from '../third-level/third-level.component';

@Component({
  selector: 'app-second-level',
  imports: [CommonModule, ThirdLevelComponent],
  template: `
  <strong>{{ childData.label }}</strong>
  <span>{{visualizeChangeDetectionRan()}}</span>
  <div class="children">
  <app-third-level
    *ngFor="let data of childData.children; trackBy: track"
    [childData]="data"
  ></app-third-level>
  </div>
  `,
  standalone: true,
  styleUrls: ['./second-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
