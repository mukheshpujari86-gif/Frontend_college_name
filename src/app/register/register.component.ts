import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularAPIService } from '../API/angular-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
selectedStudentId: number | null = null;
students:any[]=[];

   constructor (private router: Router,private fb: FormBuilder,private API:AngularAPIService){}

   ngOnInit() {
    this.createForm();

     const data = history.state?.student;
      //console.log(history.state);
  if (data) {
    this.selectedStudentId = data.id;

    this.form.patchValue({
      admin: data.admin,
      name: data.name,
      college_Area: data.college_Area,
      password: data.password
    });
  }
  }

  createForm() {
    this.form = this.fb.group({
        admin: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
        name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
  college_Area: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
  password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    getStudents():void{
    //this.isLoading = true;
    this.API.getServiceStudent().subscribe(
         (data) => {
        this.students=data
        //this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.selectedStudentId) {
      // 🔥 UPDATE

      this.API.updateStudent(this.selectedStudentId, this.form.value)
  .subscribe(() => {
    localStorage.setItem('adminName', this.form.value.admin);
    this.router.navigate(['/home']);
  });
      // this.API.updateStudent(this.selectedStudentId, this.form.value)
      //   .subscribe(() => {
      //     alert('Student updated successfully ✅');
      //     this.getStudents();
      //     this.router.navigate(['/']);
      //   });
      }
      else{
        //post
        this.API.postServiceStudent(this.form.value)
  .subscribe(() => {
    localStorage.setItem('adminName', this.form.value.admin);
    this.router.navigate(['/home']);
  });
      //   this.API.postServiceStudent(this.form.value)
      // .subscribe((res)=>{
      //   alert('Admin saved successfully ✅');
      //   this.router.navigate(['/home']);
      // });
      
        } 
    }
  }

    home(){
    this.router.navigate(['/']);
   }


}
