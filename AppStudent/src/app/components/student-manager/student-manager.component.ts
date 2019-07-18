import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RegisteredStudent } from 'src/app/models/response/RegisteredStudent';
import { StudentServicesService } from 'src/app/services/student-services.service';
import { NewStudent } from 'src/app/models/request/NewStudent';
import { registerLocaleData } from '@angular/common';
import { UpdateStudent } from 'src/app/models/request/UpdateStudent';
import { DeletedStudent } from 'src/app/models/request/DeletedStudent';
@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.css']
})
export class StudentManagerComponent implements OnInit {
  private StudentList:RegisteredStudent[]=[];
  public codigo:Number;
  public student:RegisteredStudent;
  private columns = [
    {name:'Id',prop:'Id'},
    {name:'Name',prop:'Name'},
    {name:'Grade',prop:'Grade' },
    {name:'School',prop:'School' }
  ];
  constructor(private studentService:StudentServicesService) { }

  ngOnInit() {
    this.studentService.ListAllStudents().subscribe(studentList=>{
      this.StudentList = studentList;
    })
  }
  public RegisterOnServer(newStudent:NewStudent){
    this.studentService.RegisterOnServer(newStudent).subscribe(registeredStudent=>{
      this.StudentList.push(registeredStudent);
      this.StudentList=[...this.StudentList];
    });
  }

public DeleteOnServer(deletedStudent:DeletedStudent){
  this.studentService.DeleteOnServer(deletedStudent).subscribe(registeredStudent=>{
    var i = 0;
    this.StudentList.forEach(element => {
      if(element.Id == registeredStudent.Id)
        {
          this.StudentList = this.StudentList.filter(element => element.Id !== registeredStudent.Id);
        }
        i = i + 1;
    });
  });
}

  public UpdateOnServer(updateStudent:UpdateStudent){
    this.studentService.UpdateOnServer(updateStudent).subscribe(registeredStudent=>{
      
      this.StudentList.forEach(element => {
        if(element.Id == registeredStudent.Id)
        {
          element.Name = registeredStudent.Name
          ,element.Grade = registeredStudent.Grade
          ,element.School = registeredStudent.School
          
        }
      });
      this.StudentList=[...this.StudentList];
    });
  }
  onActivate(event) {
    if(event.type == 'click') {
      this.student = {
        StudentId : event.row.StudentId
        ,Id : event.row.StudentId
        ,Name : event.row.Name
        ,Grade : event.row.Grade
        ,School : event.row.School
      };
    }
  }

}
