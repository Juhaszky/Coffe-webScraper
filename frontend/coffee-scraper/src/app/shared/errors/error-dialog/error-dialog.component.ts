import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../global-error-handler/services/error.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'error-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  errorMsg$!: Observable<string>;

  constructor(private errorS: ErrorService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.errorMsg$ = this.errorS.errorMsgSubject.asObservable();
    this.errorMsg$.subscribe(() => this.cdr.detectChanges());
  }

}
