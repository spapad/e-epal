import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "breadcrumbs",
    template: `
          <div [hidden]="currentUrl !== '/epal-class-select'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Επιλογή Τάξης </p></div>
          <div [hidden]="currentUrl !== '/sector-fields-select'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Επιλογή Τoμέα</p></div>
          <div [hidden]="currentUrl !== '/region-schools-select'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Επιλογή Σχολείου ανα Περιφερειακή Διεύθυνση</p></div>
          <div [hidden]="currentUrl !== '/sectorcourses-fields-select'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Επιλογή Ειδικότητας ανα τoμέα</p></div>
          <div [hidden]="currentUrl !== '/schools-order-select'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Σειρά Προτίμησης Επιλεχθέντων Σχολείων</p></div>
          <div [hidden]="currentUrl !== '/student-application-form-main'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Προσωπικά Στοιχεία</p></div>
          <div [hidden]="currentUrl !== '/application-submit'" class="col-sm-12"><p class="crumb" >Νέα Δήλωση Προτίμησης -> Προεπισκόπηση Δήλωσης Προτίμησης</p></div>
          <div [hidden]="currentUrl !== '/submited-preview'" class="col-sm-12"><p class="crumb" > Υποβληθείσες Δηλώσεις Προτίμησης</p></div>
          <div [hidden]="currentUrl !== '/ministry'" class="col-sm-12"><p class="crumb" > Διαχειριστής Υπουργείου Παιδείας -> Σύνδεση</p></div>
  `
})

@Injectable() export default class Breadcrumbs implements OnInit {
    private currentUrl: string;

    constructor(private _router: Router) { }
    ngOnInit() {
        this.currentUrl = this._router.url;
    }

}
