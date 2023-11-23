import { Component, OnInit } from '@angular/core';
import { StudentModel } from './students.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentapiService } from '../service/studentapi.service';
import { error } from 'console';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  studentModel:StudentModel=new StudentModel();
  formValue !: FormGroup;
  studentData:any;

  constructor(private formBuilder:FormBuilder, private api:StudentapiService){

  }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      id:[''],
      name:[''],
      subject:[''],
      roll:['']
    })
    this.getAllstudetn();
    throw new Error('Method not implemented.');
  }

  

 

  addStudent(){
    this.studentModel.name=this.formValue.value.name;
    this.studentModel.subject=this.formValue.value.subject;
    this.studentModel.roll=this.formValue.value.roll;
    this.api.saveStudent(this.studentModel)
    .subscribe(
      res=>{
        console.log(res)
        alert("Data saved.")
        this.formValue.reset()
        this.getAllstudetn();
      },
      err=>{
        alert("Data not saved.")
      }
    )
  }

  getAllstudetn(){
    this.api.getAll().subscribe(
      {next:res=>{this.studentData=res}}
    )
  }
  deleteStu(row:any){
    this.api.deleteStudent(row.id)
    .subscribe({next:res => {
      console.log(res)
      alert("Data is deleted.")
      this.formValue.reset()
      this.getAllstudetn()
    
    },
    error:err => alert("Data not deleted")})
  }

  editbyId(row : any){
    this.studentModel.id=row.id;
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['subject'].setValue(row.subject)
    this.formValue.controls['roll'].setValue(row.roll)
  }

  editStu(){
    this.studentModel.name = this.formValue.value.name;
    this.studentModel.subject = this.formValue.value.subject;
    this.studentModel.roll = this.formValue.value.roll;

    this.api.editStudent(this.studentModel.id, this.studentModel)
    .subscribe({next:res =>{
      console.log(res)
      alert("Data edited")
      this.formValue.reset();
      this.getAllstudetn()
    },
    error: err => {alert("Data not edited.")} 
    })
  }

}