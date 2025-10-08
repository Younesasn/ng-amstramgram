import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PictureApi } from '../shared/api/picture-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-picture',
  imports: [ReactiveFormsModule],
  templateUrl: './new-picture.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPicture {
  private readonly pictureApi = inject(PictureApi);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly zone = inject(NgZone);

  form: FormGroup = new FormGroup({
    title: new FormControl('', { validators: [Validators.required, Validators.minLength(1)] }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    image: new FormControl(''),
  });

  protected imageFile?: File;
  protected pictureReader: string | null = null;

  extractFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.item(0) ?? undefined;
    if (!selectedFile) {
      this.removeImage();
      return;
    }

    // Réinitialise l'aperçu puis lit le fichier sélectionné
    this.pictureReader = null;
    this.imageFile = selectedFile;
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      this.zone.run(() => {
        this.pictureReader = (readerEvent.target as FileReader).result as string;
        this.cdr.markForCheck();
      });
    };
    reader.readAsDataURL(selectedFile);
  }

  protected removeImage(): void {
    this.imageFile = undefined;
    this.pictureReader = null;
    this.form.get('image')?.setValue('');
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
