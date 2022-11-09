import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-health-delete-dialog',
  templateUrl: './health-delete-dialog.component.html',
  styleUrls: ['./health-delete-dialog.component.scss']
})
export class HealthDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HealthDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
