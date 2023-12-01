import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TeacherService } from '../servies/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{

  techerModel: TeacherModel = new TeacherModel()
  teachData: any

  formValue !: FormGroup

  constructor(private techerServ: TeacherService , private fromBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formValue = this.fromBuilder.group({
    name:[''],
    department:[''],
    gender:[''],
    hobby_reading:[false],
    hobby_coading :[false]
    })
    this.getALL()
  }

  setDataForm(){
        this.techerModel.name = this.formValue.value.name
        this.techerModel.department = this.formValue.value.department
        this.techerModel.gender = this.formValue.value.gender

        let hobbies: string[]=[]
        if(this.formValue.value.hobby_reading){
          hobbies.push("Reading")
        }
        if(this.formValue.value.hobby_coading){
          hobbies.push("Coading")
        }

        this.techerModel.hobby= hobbies;
  }

  saveTeacher(){
    this.setDataForm()

    this.techerServ.saveTech(this.techerModel)
    .subscribe({
      next: res => {
        console.log(res)
        alert("Data Saved")
        this.formValue.reset()
        this.getALL()
      },
      error:err => {
        alert("Data not saved")
      }
    })
  }

  getALL(){
    this.techerServ.showTech().subscribe(
      res =>{this.teachData=res}
    )
  }

  deleteTecher(tech:any){
    this.techerServ.deleteTech(tech.id)
    .subscribe({
      next: res => {
        console.log(res)
        alert("Data Deleted")
        this.formValue.reset()
        this.getALL()
      },
      error:err => {
        alert("Data not Deleted")
      }
    })
  }
  onEdit(tech:any){
    this.techerModel.id = tech.id
    this.formValue.controls['name'].setValue(tech.name)
    this.formValue.controls['department'].setValue(tech.department)
    this.formValue.controls['gender'].setValue(tech.gender)
    this.formValue.controls['hobby_reading'].setValue(tech.hobby.includes("Reading"))
    this.formValue.controls['hobby_coading'].setValue(tech.hobby.includes("Coading"))

  }

  editTecher(){
    this.setDataForm()
    this.techerServ.updateTech(this.techerModel.id, this.techerModel)
    .subscribe({
      next: res => {
        console.log(res)
        alert("Data Updated")
        this.formValue.reset()
        this.getALL()
        
      },
      error:err => {
        alert("Data not Updated")
      }
    })
  }
   
}
