import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit{

  isShowLoader: boolean = false;
  loaderService = inject(CommonService);
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loaderService.isLoading.subscribe({
      next: (response: boolean) => {
        this.isShowLoader = response;
        this.cdr.detectChanges();
      }
    });
  }

}
