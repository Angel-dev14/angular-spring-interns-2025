import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, OnInit } from '@angular/core';
import { ExampleComponent } from './example/example.component';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  imports: [
    ChildComponent,
    ExampleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  name = 'angular-app';
  person = {
    name: 'Angel'
  }

  ngZone = inject(NgZone);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.name = 'Sorsix';
          this.cdr.markForCheck();
        })
        console.log('changed', this.name);
      }, 4000);
    });

  }

  updateName() {
  }
}
