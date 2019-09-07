import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TodoService } from '../../services/todo.service';
import { EdittaskComponent } from './edittask/edittask.component';
import {
  faPencilAlt,
  faTrashAlt,
  faEdit,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import { TODO } from '@server/models';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  editTaskModal: MatDialogRef<EdittaskComponent>;
  faIcons = { edit: faPen, delete: faTrashAlt };
  constructor(public todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.todoFormInstance();
  }
  submitToDoForm(formVal, valid: boolean) {
    if (valid) {
      this.todoService.crudTask(formVal, 'create');
      this.todoForm.controls[`task`].setValue('');
      this.todoForm.controls[`task`].setErrors(null);
    }
  }
  updateTask(todoObj: TODO) {
    this.todoService.crudTask(todoObj, 'update');
  }
  editTask(todoObj: TODO) {
    this.editTaskModal = this.dialog.open(EdittaskComponent, {
      width: '500px',
      panelClass: 'rounded-light-modal',
      data: { todoData: todoObj }
    });
    this.editTaskModal.afterClosed().subscribe(result => {
      if (result) {
        todoObj.task = result.task;
        this.todoService.crudTask(todoObj, 'update');
      }
    });
  }
  deleteTask(todoObj: TODO) {
    this.todoService.crudTask(todoObj, 'delete');
  }
  todoFormInstance() {
    this.todoForm = new FormGroup({
      task: new FormControl('', [
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
