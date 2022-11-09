import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-var-tax-delete-dialog',
  templateUrl: './var-tax-delete-dialog.component.html',
  styleUrls: ['./var-tax-delete-dialog.component.scss']
})
export class VarTaxDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VarTaxDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
