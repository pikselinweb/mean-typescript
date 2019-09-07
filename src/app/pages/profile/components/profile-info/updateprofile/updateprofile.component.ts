import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styles: []
})
export class UpdateprofileComponent implements OnInit {
  profileForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.profileFormInstance();
  }
  submitprofileForm(formdata, valid) {
    if (valid) {
      this.dialogRef.close(formdata);
    }
  }
  profileFormInstance() {
    this.profileForm = new FormGroup({
      _id: new FormControl(this.data.profileInfos._id),
      name: new FormControl(
        this.data.profileInfos.name ? this.data.profileInfos.name : '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      surname: new FormControl(
        this.data.profileInfos.surname ? this.data.profileInfos.surname : '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ),
      email: new FormControl(
        this.data.profileInfos.email ? this.data.profileInfos.email : '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
          Validators.email
        ]
      ),
      phoneNumber: new FormControl(
        this.data.profileInfos.phoneNumber
          ? this.data.profileInfos.phoneNumber
          : '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ),
      profession: new FormControl(
        this.data.profileInfos.profession
          ? this.data.profileInfos.profession
          : '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ),
      web: new FormControl(
        this.data.profileInfos.web ? this.data.profileInfos.web : '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120)
        ]
      ),
      address: new FormControl(
        this.data.profileInfos.address ? this.data.profileInfos.address : '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      )
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
