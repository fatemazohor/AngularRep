import { Component, OnInit } from '@angular/core';
import { StudentModel } from './student.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  dataModel:StudentModel = new StudentModel()
  stuData: any
  formValue !:FormGroup

  constructor(private studentService:StudentService, private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.formValue= this.formBuilder.group({
      name:[''],
      gender:[''],
      subject:[''],
      hobby_read:[false],
      hobby_coad:[false]
    })
    this.getStudent()
   
   
  }
  setDataForm(){
    this.dataModel.name= this.formValue.value.name
    this.dataModel.gender= this.formValue.value.gender
    this.dataModel.subject= this.formValue.value.subject

    let hobbies:string[]=[]

    if(this.formValue.value.hobby_read){
      hobbies.push('Reading')
    }

    if(this.formValue.value.hobby_coad){
      hobbies.push('Coading')
    }
    this.dataModel.hobby =hobbies
  }

  saveStudent(){
    this.setDataForm()

    this.studentService.saveStudent(this.dataModel)
    .subscribe({
      next:res =>{
        console.log(res)
        alert('Data saved')
        this.formValue.reset()
        this.getStudent()
      },
      error:err =>{
        alert("Data not saved")
      }
    })
  }

  getStudent(){
    this.studentService.gettudent().
    subscribe(res => {this.stuData=res})
  }

  deleteStudetn(stu:any){
    this.studentService.deleteStudent(stu.id)
    .subscribe({
      next:res =>{
        console.log(res)
        alert('Data deleted')
      },
      error:err =>{
        alert("Data not deleted")
      }
    })
  }

  onEdit(tech:any){
    this.dataModel.id=tech.id
    this.formValue.controls['name'].setValue(tech.name)
    this.formValue.controls['gender'].setValue(tech.gender)
    this.formValue.controls['subject'].setValue(tech.subject)
    this.formValue.controls['hobby_read'].setValue(tech.hobby.includes('Reading'))
    this.formValue.controls['hobby_coad'].setValue(tech.hobby.includes('Coading'))
    
  }

  updateStudent(){
    this.setDataForm()

    this.studentService.updateStudent(this.dataModel.id, this.dataModel)
    .subscribe({
      next:res =>{
        console.log(res)
        alert('Data updated')
        this.formValue.reset()
        this.getStudent()
      },
      error:err =>{
        alert("Data not updated")
      }
    })
  }
}
