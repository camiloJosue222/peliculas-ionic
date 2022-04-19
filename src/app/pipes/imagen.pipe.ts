import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {
    if ( !img ){
      return './assets/icon/no-image-banner.jpg';
    }
    
    const imgUrl = `${ URL }/${ size }/${ img }`;
    return imgUrl;
  }
  //https://image.tmdb.org/t/p/w500/5Zv5KmgZzdIvXz2KC3n0MyecSNL.jpg

}
