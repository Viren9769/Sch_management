import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptor/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes),
      provideClientHydration(),
      provideHttpClient(),
      provideAnimations(),
      provideToastr(),
      provideHttpClient(withInterceptors([tokenInterceptor]))
    ]
};
