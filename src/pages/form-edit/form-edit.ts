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
  selector: "page-form-edit",
  templateUrl: "form-edit.html"
})
export class FormEditPage {
  public FormEditData: FormGroup;
  responseEditDataBarang: any;
  GetIdbarang: any;
  postDataBarang: any;
  Data_Barang: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public authService: AuthServiceProvider,
    public common: CommonProvider,
    public toastCtrl: ToastController
  ) {
    this.FormEditData = this.formBuilder.group({
      id_barang: [""],
      nama_barang: [""],
      qty: [""],
      harga: [""]
    });
  }

  ionViewWillEnter() {
    //ambil data dari database untuk di tampilkan di form
    this.common.presentLoading();
    let id = this.navParams.get("idbarang");
    this.GetIdbarang = { id_barang: id };
    this.authService.postData(this.GetIdbarang, "Get_Barang_Edit").then(
      result => {
        this.postDataBarang = result;
        if (this.postDataBarang.Get_Barang_Edit) {
          this.Data_Barang = this.postDataBarang.Get_Barang_Edit;
          console.log(this.Data_Barang);
          this.common.closeLoading();
        } else {
          this.Data_Barang = "";
          this.common.closeLoading();
        }
      },
      err => {
        const toast = this.toastCtrl.create({
          message: "Gagal koneksi ke server." + err,
          duration: 2500
        });
        toast.present();
        this.common.closeLoading();
      }
    );
  }

  simpan() {
    console.log(this.FormEditData.value);
    this.common.presentLoading();
    this.authService.postData(this.FormEditData.value, "Edit_Barang").then(
      result => {
        this.responseEditDataBarang = result;
        if (this.responseEditDataBarang.Edit_Barang == "Edit success") {
          const toast = this.toastCtrl.create({
            message: "Data berhasil diubah.",
            duration: 2500
          });
          toast.present();
          this.common.closeLoading();
          this.navCtrl.pop();
        } else {
          const toast = this.toastCtrl.create({
            message: "Data gagal diubah.",
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
