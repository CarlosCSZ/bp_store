import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './presentation/app/app.config';
import { AppComponent } from './presentation/app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
