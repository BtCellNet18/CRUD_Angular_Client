import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: NgbModal) { }

  confirm(title: string, message: string): Promise<boolean> {
    const confirmRef = this.modalService.open(ConfirmComponent);
    confirmRef.componentInstance.title = title;
    confirmRef.componentInstance.message = message;

    return confirmRef.result;
  }
}
