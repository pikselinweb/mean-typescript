import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { SnackbarService } from '@app/shared';
import * as Compress from 'compress.js';
// const Compress = require('compress.js');

@Component({
  selector: 'app-updateprofilepicture',
  templateUrl: './updateprofilepicture.component.html',
  styles: []
})
export class UpdateprofilepictureComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  base64Image: any = '';
  cropperReady = false;
  constructor(
    public dialogRef: MatDialogRef<UpdateprofilepictureComponent>,
    private snacbar: SnackbarService
  ) {}

  ngOnInit() {}
  saveImg() {
    const files = [this.croppedImage];
    const compress = new Compress();
    compress
      .compress(files, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.85, // the quality of the image, max is 1,
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      })
      .then(results => {
        const img1 = results[0];
        const base64str = img1.data;
        const imgExt = img1.ext;
        const file = Compress.convertBase64ToFile(base64str, imgExt);
        const base64img = new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
        });
        base64img.then(b64 => {
          const blobPic = file ? file : this.croppedImage;
          const bse64img = b64 ? b64 : this.base64Image;
          this.dialogRef.close({
            pPicture: blobPic,
            b64Picture: bse64img
            // cImage: file
          });
        });
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event) {
    this.croppedImage = event.file;
    this.base64Image = event.base64;
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  loadImageFailed() {
    this.snacbar.snackMessage('ERRORS.imageload_fail', { translate: true });
  }
}
