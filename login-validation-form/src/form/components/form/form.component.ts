import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VaidationRepositoryService } from '../../../api/services/validation.repository';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [FormService, VaidationRepositoryService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  public constructor(public formService: FormService) {}

  public ngOnInit(): void {
    this.formService.hasErrorOrIncorrectLogin$.subscribe()
  }

  public onSendButtonClick(): void {
    this.formService.onSendButtonClick();
  }
}
