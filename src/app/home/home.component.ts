import { Component, OnInit } from '@angular/core';
import { AngularAPIService } from '../API/angular-api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   constructor (private router: Router,private API:AngularAPIService){}

   showProfileDropdown = false;
    students:any[]=[];
    isLoading = true;

    adminName = '';
    adminPassword = '';
    adminInitial = '';

    //pagenation
    
    currentPage: number = 1;
    pageSize: number = 10;
    totalRecords: number = 0;
 

  //pagination

  //sort
     allStudents: any[] = [];
    sortField: string = 'name';
    sortDirection: string = 'asc'; // asc / desc

  //sort
   ngOnInit(): void {
     this.adminName = localStorage.getItem('adminName') || '';
     this.adminPassword = localStorage.getItem('adminPassword') || '';
    this.adminInitial = this.adminName.charAt(0).toUpperCase();
     this.getStudents();
   }

   about(){
    this.router.navigate(['/about']);
   }

   getStudents():void{
    this.isLoading = true;
    //pAGINtion
    this.API.getStudentsByAdmin(this.adminName).subscribe({
    next: (data: any[]) => {
      this.allStudents = data;
      this.totalRecords = data.length;
      this.currentPage = 1;
      this.applyPagination();
      this.isLoading = false;
      console.log('Students fetched successfully:', data);
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}
    //pagination logic

    applyPagination() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;

      this.students = this.allStudents.slice(startIndex, endIndex);
    }

nextPage() {
  if (this.currentPage * this.pageSize < this.totalRecords) {
    this.currentPage++;
    this.applyPagination();
  }
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.applyPagination();
  }
}

  //pagination logic

    deleteStudents(id: number,index: number): void {
    if (confirm('Are you sure you want to delete this College details?')) {
    this.API.deleteServiceStudent(id).subscribe(
      () => {
        //console.log(`Region with id ${id} deleted successfully.`);
        alert(`Student with id ${index + 1} deleted successfully.`);
        this.getStudents(); // Refresh the list after deletion
      },
      (error) => {
        console.error(`Error deleting region with id ${index + 1}:`, error);
      }
    );  
  }
}

editStudent(student: any) {
  this.router.navigate(['/about'], {
    state: { student: student }
  });
}

toggleProfileDropdown() {
  this.showProfileDropdown = !this.showProfileDropdown;
}

logout() {
  localStorage.clear();
  sessionStorage.clear();
  this.router.navigate(['/']);
}

goToProfile(){
  this.router.navigate(['/about']);
}

  }
