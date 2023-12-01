import { Component , OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TraineeModel } from './trainee.model';
import { TraineeService } from '../services/trainee.service';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css'
})
export class TraineeComponent implements OnInit{
  traineModel:TraineeModel = new TraineeModel();
  formValue !: FormGroup;
  traineData: any;
  

  constructor(private traineeService:TraineeService, private formBuilder: FormBuilder){

  }

  ngOnInit():void{
  this.formValue=this.formBuilder.group(
    {
      name:[''],
      subject:[''],
      gender:[''],
      hobby_reading:[false],
      hobby_coading:[false],
      
      
     }
) 
this.getAlltrainee();
}



setformToData(){
  this.traineModel.name=this.formValue.value.name;
  this.traineModel.subject=this.formValue.value.subject;
  this.traineModel.gender=this.formValue.value.gender;
  let hobbies:string[]=[];
  if(this.formValue.value.hobby_reading){
    hobbies.push('Reading')
  }
  if(this.formValue.value.hobby_coading){
    hobbies.push('Coading')
  }
  this.traineModel.hobby=hobbies;
}


saveTrainee(){
  this.setformToData();
  this.traineeService.traninePost(this.traineModel).subscribe(
    {next:res=>{
      console.log(res)
      alert("Data saved")
      this.formValue.reset()
      this.getAlltrainee();
    },
    error:err=>{
      alert("Data not saved")
    }
  }
  )
}

getAlltrainee(){
  this.traineeService.traineGet().subscribe(res=>{this.traineData=res})
}

trainDel(tr:any){
  this.traineeService.traineDelete(tr.id).subscribe(
    {next:res=>{
      console.log(res)
      alert("Data deleted")
      this.formValue.reset()
      this.getAlltrainee();
    },
    error:err=>{
      alert("Data not deleted")
    }
  }
  )


}

onEdit(tr:any){
  this.traineModel.id=tr.id;
  this.formValue.controls['name'].setValue(tr.name)
  this.formValue.controls['subject'].setValue(tr.subject)
  this.formValue.controls['gender'].setValue(tr.gender)
  this.formValue.controls['hobby_reading'].setValue(tr.hobby.includes('Reading'))
  this.formValue.controls['hobby_coading'].setValue(tr.hobby.includes('Coading'))
}

trainEd(){
  this.setformToData();
  this.traineeService.traineEdit(this.traineModel.id ,this.traineModel).subscribe(
    {next:res=>{
      console.log(res)
      alert("Data edited")
      this.formValue.reset()
      this.getAlltrainee();
      this.ngOnInit();
    },
    error:err=>{
      alert("Data not edited")
    }
  }
  )
}
  }
