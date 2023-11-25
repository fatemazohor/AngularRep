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
  selectedHobby:any[]=[
{
  key:1,value:"Coding"
},
{
  key:2,value:"Reading"
}
  ]

  constructor(private traineeService:TraineeService, private formBuilder: FormBuilder){

  }

  ngOnInit():void{
  this.formValue=this.formBuilder.group(
    {
      name:[''],
      subject:[''],
      gender:[''],
      hobby:[''],
      
      
     }
) 
this.getAlltrainee();
}

getHobby():any[]{

  return this.selectedHobby.filter(e=>{this.formValue.value.hobby})
}
saveTrainee(){
  this.traineModel.name=this.formValue.value.name;
  this.traineModel.subject=this.formValue.value.subject;
  this.traineModel.gender=this.formValue.value.gender;
  this.traineModel.hobby=this.formValue.value.hobby;
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
  this.formValue.controls['hobby'].setValue(tr.hobby)
}

trainEd(){
  this.traineModel.name=this.formValue.value.name;
  this.traineModel.subject=this.formValue.value.subject;
  this.traineModel.gender=this.formValue.value.gender;
  this.traineModel.hobby=this.formValue.value.hobby;
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
