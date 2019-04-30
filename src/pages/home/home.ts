import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { CommonProvider } from "../../providers/common/common";
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { FormEditPage } from "../form-edit/form-edit";
import { FormInputPage } from "../form-input/form-input";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  postDataBarang: any;
  Data_Barang: any;
  idbarangDelete: any;
  postDelete: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public common: CommonProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.common.presentLoading();
    this.authService.GetData("Data_Barang").then(
      result => {
        this.postDataBarang = result;
        if (this.postDataBarang.Data_Barang) {
          this.Data_Barang = this.postDataBarang.Data_Barang;
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

  pageInput() {
    this.navCtrl.push(FormInputPage);
  }
  pageEdit(idbarang) {
    this.navCtrl.push(FormEditPage, {
      idbarang: idbarang
    });
  }

  Hapus(idbarang) {
    this.idbarangDelete = { id_barang: idbarang };
    this.common.presentLoading();
    this.authService.postData(this.idbarangDelete, "Delete_Barang").then(
      result => {
        this.postDelete = result;
        if (this.postDelete.Delete_Barang) {
          this.authService.GetData("Data_Barang").then(
            result => {
              this.postDataBarang = result;
              if (this.postDataBarang.Data_Barang) {
                this.Data_Barang = this.postDataBarang.Data_Barang;
              } else {
                this.Data_Barang = "";
              }
            },
            err => {}
          );
          this.common.closeLoading();
        } else {
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

  showConfirm(idbarang) {
    const confirm = this.alertCtrl.create({
      message: "Apakah anda yakin akan menghapus data ini?",
      buttons: [
        {
          text: "Tidak",
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: "Ya",
          handler: () => {
            this.Hapus(idbarang);
          }
        }
      ]
    });
    confirm.present();
  }
}
