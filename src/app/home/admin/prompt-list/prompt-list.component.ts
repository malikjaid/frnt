import { AfterViewChecked, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { debounceTime } from 'rxjs';
import { HistoryPayload } from '../../../shared/modal/payload.modal';
import { DoctorService } from '../../../shared/services/doctor.service';
import { PatientService } from '../../../shared/services/patient.service';
import { SharedModule } from '../../../shared/shared.module';
import { DatePipe } from '@angular/common';
import { CreatePromptComponent } from '../create-prompt/create-prompt.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prompt-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './prompt-list.component.html',
  styleUrl: './prompt-list.component.scss'
})
export class PromptListComponent implements AfterViewChecked{
  displayedColumns: string[] = ['Sr no', 'Template', 'Prompt Text', 'Template Type', 'Created Date','Edit', 'Status'];
  dataSource =<any>([]);

  pagination:HistoryPayload = {
    search_key:'',
    search_column:'',
    order:'desc',
    page:1,
    per_page:10,
    role_id:1
  }
  totalCount:number =0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  modalService = inject(MatDialog)
  doctorService = inject(DoctorService)
  commonService = inject(PatientService)
  searchForm!:FormGroup;
  checked = false;
  toasterService = inject(ToastrService);

  constructor(private cdr: ChangeDetectorRef) { }
  
  ngOnInit(){
    this.searchForm = new FormGroup({
      search:new FormControl('')
    });

    this.searchForm.get('search')?.valueChanges.pipe(debounceTime(500)).subscribe({
      next:(response:string)=>{
        if(response){
          this.searchFunction(response);
        }else{
          this.searchFunction('');

        }
      }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadPromptHIstory(this.pagination);
  }

  loadPromptHIstory(payload:HistoryPayload){
    this.doctorService.retrievePromptList(payload).subscribe({
      next:(response:any)=>{
        if(response){
          const list  = response as any;
          this.dataSource = list.data.map((promptList:any)=>{
            return {id:promptList.id, state_id:promptList.state_id, promptName:promptList.key,text:promptList.value, createdAt:promptList.created_at, type:promptList.type, typeId:promptList.type_id,edit:'',status:''}
          });
          this.pagination.page = list.meta.current_page;
          this.pagination.per_page = list.meta.per_page;
          this.totalCount = list.meta.total;
        }
      }
    })
  }

  showEditPromptModal(promptdata:any){
    const dialogRef = this.modalService.open(CreatePromptComponent, {
      width:'600px',
      maxHeight:'90vh',
      data: {
        isEdit: true,
        promptdata: promptdata,
      }
    });

    dialogRef.afterClosed().subscribe({
      next:(response)=>{
        if(response){
          this.loadPromptHIstory(this.pagination);
        }
      }
    });
  }

  handlePagination(event:PageEvent){
    const paginationPayload = {...this.pagination,
      page:event.pageIndex + 1,
      per_page:event.pageSize
    }
    this.loadPromptHIstory(paginationPayload);
  }


  sortFunction(sortColumn:Sort){
    const payload = {...this.pagination , order:sortColumn.direction , order_by:sortColumn.active}
    this.loadPromptHIstory(payload);
  }

  searchFunction(searchText:string){
      const payload = {...this.pagination , search_key:searchText}
      this.loadPromptHIstory(payload);
  }

  getSlideValue(event:any, element:any){
    this.doctorService.enableDisable(element?.id, {}).subscribe({
      next:(res)=>{
        if(res?.status===200){
          this.toasterService.success(res?.message);
        }
      }
    });
  }

  createPrompt(){
    const dialogRef = this.modalService.open(CreatePromptComponent, {
      width:'600px',
      maxHeight:'90vh',
      data: {
        isEdit: false,
      }
    });

    dialogRef.afterClosed().subscribe({
      next:(response)=>{
        if(response){
          this.loadPromptHIstory(this.pagination);
        }
      }
    });
  }

  getIndex(index: number): number {
    return index + 1 + this.paginator.pageIndex * this.paginator.pageSize;
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

}
