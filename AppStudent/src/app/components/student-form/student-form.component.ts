import { Component, OnInit, Output, EventEmitter, Input,SimpleChanges } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, ValidationErrors} from '@angular/forms';
import { StudentServicesService } from '../../services/student-services.service';
import { NewStudent } from '../../models/request/NewStudent';
import { RegisteredStudent } from '../../models/response/RegisteredStudent';
import { UpdateStudent } from 'src/app/models/request/UpdateStudent';
import { DeletedStudent } from 'src/app/models/request/DeletedStudent';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  public codigo:Number;
  public StudentForm:FormGroup;
  public updateStudent:UpdateStudent;
  @Output() registered = new EventEmitter<NewStudent>();
  @Output() registered2 = new EventEmitter<UpdateStudent>();
  @Output() registered3 = new EventEmitter<DeletedStudent>();
  
  @Input() student:RegisteredStudent;
  ngOnChanges(changes: SimpleChanges){
    if(changes.student.currentValue!=undefined)
    {
      this.codigo = changes.student.currentValue.StudentId;
      this.StudentForm = this.fb.group({
        Name: [changes.student.currentValue.Name, Validators.required],
        Grade: [changes.student.currentValue.Grade, Validators.required],
        School: [changes.student.currentValue.School, Validators.required],
      });
    }else
    {
      this.codigo = 0;
    }
  }
  constructor(private fb: FormBuilder,private studentService:StudentServicesService) { }

  ngOnInit() {
    this.StudentForm = this.fb.group({
      Name: ['', Validators.required],
      Grade: ['', Validators.required],
      School: ['', Validators.required],
    });
  }
  public CleanForm(){
    this.StudentForm.get('Name').setValue('');
    this.StudentForm.get('Grade').setValue('');
    this.StudentForm.get('School').setValue('');
  }

  public DeleteStudent(){
    this.registered3.emit({
      Id: this.codigo
      ,Name : this.StudentForm.get('Name').value
      ,Grade : this.StudentForm.get('Grade').value
      ,School : this.StudentForm.get('School').value
    });
    this.CleanForm();
  }

  public RegisterStudent(){
    if(this.codigo == 0)
    {
      this.registered.emit({
        Name:this.StudentForm.get('Name').value,
        Grade:this.StudentForm.get('Grade').value,
        School:this.StudentForm.get('School').value
      });
      this.CleanForm();
    }else{
      this.registered2.emit({
        Id: this.codigo,
        Name:this.StudentForm.get('Name').value,
        Grade:this.StudentForm.get('Grade').value,
        School:this.StudentForm.get('School').value
      });
      this.CleanForm();
      
    }
    
  }

}
