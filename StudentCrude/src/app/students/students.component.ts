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
    throw new Error('Method not implemented.');
  }

  

 

  addStudent(){
    this.studentModel.name=this.formValue.value.name;
    this.studentModel.subject=this.formValue.value.subject;
    this.studentModel.roll=this.formValue.value.roll;
    this.api.saveStudent(this.studentModel)
    .subscribe({
      next(res) {
        console.log(res)
      },
      error(err) {
        console.log(err)
      }
    })
  }
}