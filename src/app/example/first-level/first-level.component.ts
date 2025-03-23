import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone } from '@angular/core';
import { SecondLevelComponent } from '../second-level/second-level.component';
import { ChildData } from './child-data.type';

@Component({
  selector: 'app-first-level',
  imports: [CommonModule, SecondLevelComponent],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 8px;
      color: #fff;
      border-radius: 10px;
      border: 1px solid #000;
      background: #459191;
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
    <span>{{visualizeChangeDetectionRan()}}</span>

    <div class="children">
<!--    <app-second-level-->
<!--      *ngFor="let data of childData.children; trackBy: track"-->
<!--      [childData]="data"-->
<!--    ></app-second-level>-->
    </div>

  `,
  standalone: true,
  styleUrls: ['./first-level.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLevelComponent {
  @Input() public childData: ChildData;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
  ) {}

  public visualizeChangeDetectionRan(): void {
    this.zone.runOutsideAngular(() => {
      this.elementRef.nativeElement.classList.add('detecting');
      setTimeout(() => {
        this.elementRef.nativeElement.classList.remove('detecting');
      }, 1000);
    });
  }

}
