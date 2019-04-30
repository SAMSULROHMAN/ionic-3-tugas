import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { AuthServiceProvider } from "../providers/auth-service/auth-service";
import { CommonProvider } from "../providers/common/common";
import { HttpModule } from "@angular/http";
import { FormInputPage } from "../pages/form-input/form-input";
import { FormEditPage } from "../pages/form-edit/form-edit";

@NgModule({
  declarations: [MyApp, HomePage, FormInputPage, FormEditPage],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, FormInputPage, FormEditPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    CommonProvider
  ]
})
export class AppModule {}
