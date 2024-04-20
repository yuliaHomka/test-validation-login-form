import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormComponent } from '../form/components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormComponent, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {}
