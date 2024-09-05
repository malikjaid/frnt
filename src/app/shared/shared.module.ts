import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule, MatDrawerContent, MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog'
import { TranscriptDialogeComponent } from './transcript-dialoge/transcript-dialoge.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule, MatRadioGroup } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatMenuModule} from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    RouterModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDrawerContent,
    MatDrawer,
    MatDrawerContainer,
    MatDialogModule,
    TranscriptDialogeComponent,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatRadioGroup,
    MatDialogContent,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatSortModule,
    ClipboardModule,
    MatMenuModule,
    MatSlideToggleModule,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    LoaderComponent,
    RouterModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatDrawerContent,
    MatDrawer,
    MatDrawerContainer,
    MatDialogModule,
    TranscriptDialogeComponent,
    MatSnackBarModule,
    MatRadioModule,
    MatRadioGroup,
    MatDialogContent,
    MatSlideToggleModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatTooltipModule,
    MatSortModule,
    ClipboardModule,
    MatMenuModule,
    MatSlideToggleModule,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule

  ]
})
export class SharedModule { }
