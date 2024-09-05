import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { PatientService } from '../../services/patient.service';
import Chart from 'chart.js/auto';
import { DoctorService } from '../../services/doctor.service';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chartview',
  standalone: true,
  imports: [SharedModule , NgIf],
  templateUrl: './chartview.component.html',
  styleUrl: './chartview.component.scss',
})
export class ChartviewComponent implements OnInit {
  @Input() chartAuth: string = '';
  statsCount: any[] = [];
  commonService = inject(PatientService);
  doctorService = inject(DoctorService);
  renderer2 = inject(Renderer2);
  toasterService = inject(ToastrService);
  cardBackgroundColor = ['rgb(244 232 255)', 'rgb(255 244 222)', 'rgb(220 252 231)', 'rgb(255 226 230)'];
  chartData: any;
  @ViewChild('OrganisationChart', { static: true }) OrganisationChart!: ElementRef;
  orgChart!: Chart | any;
  @ViewChild('DoctorChart', { static: true }) DoctorChart!: ElementRef;
  drChart!: Chart | any;
  @ViewChild('PatientChart', { static: true }) PatientChart!: ElementRef;
  ptChart!: Chart | any;
  monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  ngOnInit(): void {
    this.getTotalCount();
    this.createChart();
    this.getChartData();
  }

  getTotalCount() {
    this.commonService.getTotalCount().subscribe({
      next: (response: any) => {
        if (response) {
          this.statsCount = response?.data;
        }
      }
    })
  }

  createChart() {
    const createChartInstance = (chartElement: any, label: string, backgroundColor: string, borderColor: string) => {
      return new Chart(chartElement, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: label,
            data: [],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 5,
          scales: { x: { display: true }, y: { display: true }, },
          plugins: { legend: { display: true, }, },
        }
      });
    };

    if(this.chartAuth === 'Admin'){
      this.orgChart = createChartInstance(this.OrganisationChart.nativeElement, "Organisation", 'rgb(149 33 255)', 'rgb(149 33 255)');
      this.drChart = createChartInstance(this.DoctorChart.nativeElement, "Doctor", 'rgb(255 180 29)', 'rgb(255 180 29)');
      this.ptChart = createChartInstance(this.PatientChart.nativeElement, "Patient", 'rgb(51 255 121)', 'rgb(51 255 121)');
    }else if(this.chartAuth === 'Organisation'){
      this.renderer2.addClass(this.OrganisationChart.nativeElement.closest('.orgchart'), 'd-none');
      this.drChart = createChartInstance(this.DoctorChart.nativeElement, "Doctor", 'rgb(255 180 29)', 'rgb(255 180 29)');
      this.ptChart = createChartInstance(this.PatientChart.nativeElement, "Patient", 'rgb(51 255 121)', 'rgb(51 255 121)');
    }else if (this.chartAuth === 'Doctor'){
      this.renderer2.addClass(this.OrganisationChart.nativeElement.closest('.orgchart'), 'd-none');
      this.renderer2.addClass(this.DoctorChart.nativeElement.closest('.drchart'), 'd-none');
      this.ptChart = createChartInstance(this.PatientChart.nativeElement, "Patient", 'rgb(51 255 121)', 'rgb(51 255 121)');
    }
  }

  updateViewofChart(type: string, value: string) {
    if (this.chartData) {
      const updateChart = (chart: Chart, data: any) => {
        if(chart){
          chart.data.labels = data?.range || [];
          chart.data.datasets[0].data = data?.count || [];
          chart.update();
        }
      };
      if (type === 'all' && value === 'all') {
        updateChart(this.orgChart,  this.chartData?.Organisation?.monthly);
        updateChart(this.drChart, this.chartData?.Doctor?.monthly);
        updateChart(this.ptChart, this.chartData?.Patient?.monthly);
      } else if (type === 'orgchart') {
        const data = value === 'last_month' ? this.chartData?.Organisation?.monthly : this.chartData?.Organisation?.weekly;
        updateChart(this.orgChart, data);
      } else if (type === 'drchart') {
        const data = value === 'last_month' ? this.chartData?.Doctor?.monthly : this.chartData?.Doctor?.weekly;
        updateChart(this.drChart, data);
      } else if (type === 'ptchart') {
        const data = value === 'last_month' ? this.chartData?.Patient?.monthly : this.chartData?.Patient?.weekly;
        updateChart(this.ptChart, data);
      } else {
        
      }
    }
  }

  getChartData() {
    this.doctorService.getChartData().subscribe({
      next: (response: any) => {
        if (response?.data) {
          const formatMonthlyData = (data: any, role: string) => ({
            range: this.formatMonthDateRange(data?.monthlyData?.[role]?.map((el: any) => el?.date_range) || []),
            count: data?.monthlyData?.[role]?.map((el: any) => el?.count) || []
          });

          const formatWeeklyData = (data: any, role: string) => ({
            range: this.formatWeekDateRange(data?.weeklyData?.[role]?.map((el: any) => el?.date) || []),
            count: data?.weeklyData?.[role]?.map((el: any) => el?.count) || []
          });

          this.chartData = {
            Organisation: {
              monthly: formatMonthlyData(response.data, 'Organisation'),
              weekly: formatWeeklyData(response.data, 'Organisation')
            },
            Doctor: {
              monthly: formatMonthlyData(response.data, 'Doctor'),
              weekly: formatWeeklyData(response.data, 'Doctor')
            },
            Patient: {
              monthly: formatMonthlyData(response.data, 'Patient'),
              weekly: formatWeeklyData(response.data, 'Patient')
            },
          };
          this.updateViewofChart('all', 'all');
        } else {
          this.toasterService.success('No data found in response.');
        }
      },
      error: (err) => { 
        this.toasterService.success(err?.error?.message);
      }
    });
  }

  formatWeekDateRange(dateRange: string[]): string[] {
    if (dateRange?.length) {
      return dateRange.map(dateString => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = this.monthNames[date.getMonth()];
        return `${day} ${month}`;
      });
    } else {
      return dateRange;
    }
  }

  formatMonthDateRange(rangeList: string[]): string[] {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = this.monthNames[date.getMonth()];
      return `${day} ${month}`;
    };
    return rangeList.map(range => {
      const [start, end] = range.split(' - ');
      return `${formatDate(start)} - ${formatDate(end)}`;
    });
  }



}
