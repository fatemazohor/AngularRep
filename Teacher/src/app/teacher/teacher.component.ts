import { Component, OnInit } from '@angular/core';
import { TeacherModel } from './teacher.model';
import { TeacherService } from '../serviecs/teacher.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{

  teacherModel: TeacherModel =new TeacherModel();
  formValue !: FormGroup;

  teacherData: any;
  

  selectedHobby: any[] =[
   {key:1, hName:"Reading"},
   {key:2, hName:"Coading"}

  ];

  constructor(private api:TeacherService, private formBuilder: FormBuilder){}

  ngOnInit(): void{
    this.formValue=this.formBuilder.group({
      name:[''],
      department:[''],
      gender:[''],
      hobby_read: [false],
      hobby_coad: [false],
      

    });
    this.getTeech()

  }
setFormToModel(){
  this.teacherModel.name=this.formValue.value.name;
  this.teacherModel.department=this.formValue.value.department;
  this.teacherModel.gender=this.formValue.value.gender;
  let hobbies:string[]=[];
  if(this.formValue.value.hobby_read){
    hobbies.push('Reading');
  }
  if(this.formValue.value.hobby_coad){
    hobbies.push('Coading');
  }
  this.teacherModel.hobby=hobbies;
}
  
  saveTec(){
    // this.teacherModel.name=this.formValue.value.name;
    // this.teacherModel.department=this.formValue.value.department;
    // this.teacherModel.gender=this.formValue.value.gender;
    // this.teacherModel.hobby=this.formValue.value.hobby;
    this.setFormToModel();
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
      this.formValue.controls['hobby_read'].setValue(tech.hobby.includes('Reading'));
      this.formValue.controls['hobby_coad'].setValue(tech.hobby.includes('Coading'));

    }
    edit(){
      // this.teacherModel.name=this.formValue.value.name;
      // this.teacherModel.department=this.formValue.value.department;
      // this.teacherModel.gender=this.formValue.value.gender;
      // this.teacherModel.hobby=this.formValue.value.hobby;
      this.setFormToModel();
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

