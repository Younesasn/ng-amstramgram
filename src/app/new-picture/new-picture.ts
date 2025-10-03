import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PictureApi } from '../shared/api/picture-api';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-picture',
  imports: [ReactiveFormsModule],
  templateUrl: './new-picture.html',
})
export class NewPicture {
  private readonly pictureApi = inject(PictureApi);
  private readonly router = inject(Router);

  form: FormGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    image: new FormControl(''),
  });

  private imageFile?: File;

  extractFile(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imageFile = target.files?.[0];
  }

  onSubmit() {
    if (this.form.valid && this.imageFile) {
      console.log({ form: this.form.value, img: this.imageFile });
      this.pictureApi.upload(this.imageFile).subscribe({
        next: (filename) => {
          this.pictureApi.addPicture({ ...this.form.value, image: filename.filename }).subscribe({
            next: (pic) => {
              console.log(pic);
              this.router.navigateByUrl('/post/' + pic.id);
            },
            error: (error) => console.error({ errorAddPicture: error }),
          });
        },
        error: (error) => console.error({ errorUpload: error }),
      });
    }
  }
}
