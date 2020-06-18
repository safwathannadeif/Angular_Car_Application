import { Component, OnInit, Inject } from '@angular/core';
import { SharedService, NVP } from '../shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public shareService: SharedService,
    // public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public nVpAry: NVP[]
  ) {}
  public confirmTitle: string;
  public confirmTblSource = new MatTableDataSource<NVP>();
  confirmTblColumns: string[] = ['name', 'value'];
  ngOnInit(): void {
    this.confirmTitle = this.shareService.confirmDialogTitle;
    this.nVpAry = this.shareService.nVPArray;
    this.confirmTblSource.data = this.nVpAry;
  }
  public confirm(): void {}
  public cancel(): void {}
}
