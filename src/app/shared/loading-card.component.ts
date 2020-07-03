import {Component,Input} from '@angular/core';

@Component({
  selector: 'mat-card-loading',
  template: `
    <div>
      <mat-progress-bar [mode]="isLoading ? 'indeterminate' : 'determinate'" value="100" style="border-top-left-radius:10px;border-top-right-radius:10px;height:5px;">
      </mat-progress-bar>

      <mat-card style="border-top-left-radius:0px;border-top-right-radius:0px;">
        <ng-content></ng-content>
      </mat-card>
    </div>
  `,
})
export class LoadingCardComponent {
  @Input() isLoading: boolean;
}
