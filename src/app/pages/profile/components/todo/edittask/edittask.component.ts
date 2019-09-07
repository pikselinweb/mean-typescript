import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styles: []
})
export class EdittaskComponent implements OnInit {
  todoForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EdittaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.todoFormInstance();
  }
  submitToDoForm(formVal, valid: boolean) {
    if (valid) {
      this.dialogRef.close(formVal);
    }
  }
  todoFormInstance() {
    const task = this.data.todoData.task ? this.data.todoData.task : '';
    this.todoForm = new FormGroup({
      task: new FormControl(task, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(250)
      ])
    });
  }
  getErrorMessage(form: FormGroup, fieldName: string) {
    const formField = form.get(fieldName);
    return formField.hasError('required')
      ? 'ERRORS.field_blank'
      : formField.hasError('email')
      ? 'ERRORS.email_valid'
      : formField.hasError('minlength')
      ? 'ERRORS.minlength'
      : formField.hasError('maxlength')
      ? 'ERRORS.maxlength'
      : '';
  }
}
