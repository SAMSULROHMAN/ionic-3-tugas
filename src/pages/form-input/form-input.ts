import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { CommonProvider } from "../../providers/common/common";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
@IonicPage()
@Component({
  selector: "page-form-input",
  templateUrl: "form-input.html"
})
export class FormInputPage {
  public FormSimpanData: FormGroup;
  responseInputDataBarang: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public authService: AuthServiceProvider,
    public common: CommonProvider,
    public toastCtrl: ToastController
  ) {
    this.FormSimpanData = this.formBuilder.group({
      nama_barang: [""],
      qty: [""],
      harga: [""]
    });
  }

  simpan() {
    this.common.presentLoading();
    this.authService.postData(this.FormSimpanData.value, "Input_Barang").then(
      result => {
        this.responseInputDataBarang = result;
        if (this.responseInputDataBarang.Input_Barang == "input success") {
          const toast = this.toastCtrl.create({
            message: "Data berhasil disimpan.",
            duration: 2500
          });
          toast.present();
          this.common.closeLoading();
          this.navCtrl.pop();
        } else {
          const toast = this.toastCtrl.create({
            message: "Data gagal disimpan.",
            duration: 2500
          });
          toast.present();
          this.common.closeLoading();
        }
      },
      err => {
        const toast = this.toastCtrl.create({
          message: "Gagal koneksi ke server.",
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
      }
    );
  }
}
