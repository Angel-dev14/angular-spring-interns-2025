import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { ChildData } from '../child-data.type';

@Component({
  selector: 'app-third-level',
  imports: [CommonModule],
  standalone: true,
  template: `
    <strong>{{ childData.label }}</strong>
    <button (click)='mark()'>mark</button>
    <span>{{visualizeChangeDetectionRan()}}</span>
  `,
  styleUrls: ['./third-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThirdLevelComponent implements OnInit {
  @Input() public childData: ChildData;


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
