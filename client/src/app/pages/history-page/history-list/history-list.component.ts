import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Order} from '../../../shared/interfaces/order.interface';
import {MaterialInstance, MaterialService} from '../../../shared/classes/material.service';
import {IBid} from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() bids: IBid[];
  @ViewChild('modal') modalRef: ElementRef;

  selectedBid: IBid;

  modal: MaterialInstance;

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  selectOrder(order: IBid) {
    this.selectedBid = order;
    this.modal.open();

  }

  closeModal() {
    this.modal.close();
  }
}
