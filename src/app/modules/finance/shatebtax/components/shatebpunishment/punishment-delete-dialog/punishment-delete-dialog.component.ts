import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-punishment-delete-dialog',
  templateUrl: './punishment-delete-dialog.component.html',
  styleUrls: ['./punishment-delete-dialog.component.scss']
})
export class PunishmentDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PunishmentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
