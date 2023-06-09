import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from 'shared/dialogs/transaction/transaction-dialog.component';
import { DialogMode } from 'types/Authorization';

import { WindowService } from '../../../services/window.service';
import { TableViewTransactionAction, TransactionDialogData } from '../../../shared/table/actions/transactions/table-view-transaction-action';
import { Utils } from '../../../utils/Utils';
import { TransactionsInProgressTableDataSource } from './transactions-in-progress-table-data-source';

@Component({
  selector: 'app-transactions-in-progress',
  template: '<app-table [dataSource]="transactionsInProgressTableDataSource"></app-table>',
  providers: [TransactionsInProgressTableDataSource],
})
export class TransactionsInProgressComponent implements OnInit {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    public transactionsInProgressTableDataSource: TransactionsInProgressTableDataSource,
    private dialog: MatDialog,
    private windowService: WindowService
  ) {}

  public ngOnInit(): void {
    // Check if transaction ID id provided
    const transactionID = Utils.convertToInteger(this.windowService.getUrlParameterValue('TransactionID'));
    if (transactionID) {
      const viewAction = new TableViewTransactionAction().getActionDef();
      viewAction.action(TransactionDialogComponent, this.dialog, {
        dialogData: { transactionID } as TransactionDialogData,
        dialogMode: DialogMode.VIEW
      });
      // Clear Search
      this.windowService.deleteUrlParameter('TransactionID');
    }
  }
}
