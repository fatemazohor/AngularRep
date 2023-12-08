import { Component , OnInit} from '@angular/core';
import { ImageModel } from './image.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImageService } from '../serviecs/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{

  imageModel: ImageModel = new ImageModel()
  imgaeData:any
  formValue !: FormGroup
  localUrl !: any[];

  constructor(private imgs:ImageService, private formbuild:FormBuilder){}

  ngOnInit(): void {
    this.formValue = this.formbuild.group({
      imagename: '',
      imageurl: ''
    })
  }
  reader !:any;
  showPreviedImage(event:any){
    if(event.target.files && event.target.files[0]){
      this.reader = new FileReader()
      this.localUrl = event.target.result;
    }
    this.reader.readAsDataURL(event.target.files[0])
    console.log(this.localUrl)
  }

}
