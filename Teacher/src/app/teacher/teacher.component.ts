import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from '../serviecs/teacher.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{

  teacherModel: TeacherModel =new TeacherModel();
  formValue !: FormGroup;

  teacherData: any;
  tecgender:any;

  selectedHobby: any[] =[];

  constructor(private api:TeacherService, private formBuilder: FormBuilder){}

  ngOnInit(): void{
    this.formValue=this.formBuilder.group({
      name:[''],
      department:[''],
      gender:[''],
      hobby:[''],
      

    });
    this.getTeech()

  }
  saveTec(){
    this.teacherModel.name=this.formValue.value.name;
    this.teacherModel.department=this.formValue.value.department;
    this.teacherModel.gender=this.formValue.value.gender;
    this.teacherModel.hobby=this.formValue.value.hobby;
    
    this.api.saveTecher(this.teacherModel)
    .subscribe({
      next: res => {
        console.log(res)
        alert("Data saved")
        this.formValue.reset()
        this.getTeech()
        this.ngOnInit();
      },
      error: err=>{
        alert('Data not saved')
      }
    })
  }

  getTeech(){
    this.api.getAll().subscribe(res => {this.teacherData=res});
  }
  
  deleteTecher(tech:any){
    this.api.deleteTec(tech.id)
    .subscribe(res =>{
      console.log(res)
        alert("Data deleted")
        this.formValue.reset()
        this.getTeech()
    },
    err=>{
      alert('Data not deleted')
    }
    )

    }

    onEdit(tech:any){
      this.teacherModel.id=tech.id;
      this.formValue.controls['name'].setValue(tech.name);
      this.formValue.controls['department'].setValue(tech.department);
      this.formValue.controls['gender'].setValue(tech.gender);
      this.formValue.controls['hobby'].setValue(tech.hobby);

    }
    edit(){
      this.teacherModel.name=this.formValue.value.name;
      this.teacherModel.department=this.formValue.value.department;
      this.teacherModel.gender=this.formValue.value.gender;
      this.teacherModel.hobby=this.formValue.value.hobby;
      
      this.api.editTech(this.teacherModel.id, this.teacherModel)
      .subscribe({
        next: res => {
          console.log(res)
          alert("Data edited")
          this.formValue.reset()
          this.getTeech()
        },
        error: err=>{
          alert('Data not edited')
        }
      })
    }
  }

