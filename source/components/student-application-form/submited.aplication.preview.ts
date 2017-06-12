import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from "@angular/core";
import { Injectable } from "@angular/core";
import { AppSettings } from '../../app.settings';
import { HelperDataService } from '../../services/helper-data-service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/store';
import { ILoginInfo } from '../../store/logininfo/logininfo.types';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';


@Component({
    selector: 'submited-preview',
    template: `
<div style="min-height: 500px; margin-bottom: 20px;">
    <div class = "loading" *ngIf="(showLoader$ | async) === true"></div>
         <div class="row">
             <breadcrumbs></breadcrumbs>
        </div>

            <div *ngIf="(SubmitedApplic$ | async).length > 0" class="row" style="margin: 10px 2px 10px 2px;">
                Έχει υποβληθεί δήλωση προτίμησης ΕΠΑΛ για το νέο σχολικό έτος των παρακάτω ατόμων:
            </div>
            <div *ngIf="(SubmitedApplic$ | async).length === 0" class="row" style="margin: 10px 2px 10px 2px;">
                Δεν έχετε ακόμη υποβάλλει δήλωση προτίμησης ΕΠΑΛ για το νέο σχολικό έτος
            </div>


              <div *ngIf="(SubmitedApplic$ | async).length > 0" class="row list-group-item" style="margin: 0px 2px 0px 2px; background-color: #ccc;">
                  <div class="col-md-6" style="font-size: 1em; font-weight: bold;">Επώνυμο</div>
                  <div class="col-md-5" style="font-size: 1em; font-weight: bold;">Όνομα</div>
                  <div class="col-md-1" style="font-size: 1em; font-weight: bold;">&nbsp;</div>
              </div>

              <div *ngIf="(SubmitedApplic$ | async).length > 0">
               <div class="row list-group-item isclickable"  style="margin: 0px 2px 0px 2px;"
               [class.oddout]="isOdd"
               [class.evenout]="isEven"
               (click)="setActiveUser(UserData$.id)"
               [class.selectedappout]="userActive === UserData$.id"
               *ngFor="let UserData$  of SubmitedApplic$ | async; let i=index; let isOdd=odd; let isEven=even"  >
                    <div class="col-md-6" style="font-size: 0.8em; font-weight: bold;">{{UserData$.studentsurname}}</div>
                    <div class="col-md-5" style="font-size: 0.8em; font-weight: bold;">{{UserData$.name}}</div>
                    <div class="col-md-1" style="font-size: 1em; font-weight: bold;"><i class="fa fa-trash isclickable" (click)="deleteApplication(UserData$.id)"></i></div>

                    <div style="width: 100%">
                  <div *ngFor="let StudentDetails$  of SubmitedDetails$ | async" [hidden]="UserData$.id !== userActive" style="margin: 10px 10px 10px 10px;">

                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Αριθμός Δήλωσης Προτίμησης ΕΠΑΛ</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.applicationId}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Υποβλήθηκε</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.created}}</div>
                  </div>
                  <div class="row evenin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-12" style="font-size: 1em; font-weight: bold; text-align: center;">Στοιχεία αιτούμενου</div>
                  </div>

                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.guardian_name}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Επώνυμο</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.guardian_surname}}</div>
                  </div>
                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα πατέρα</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{ StudentDetails$.guardian_fathername }}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα μητέρας</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{ StudentDetails$.guardian_mothername }}</div>
                  </div>
                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Διεύθυνση</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.regionaddress}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">ΤΚ - Πόλη</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.regiontk}} - {{StudentDetails$.regionarea}}</div>
                  </div>

                  <div class="row evenin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-12" style="font-size: 1em; font-weight: bold; text-align: center;">Στοιχεία μαθητή</div>
                  </div>
                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα μαθητή</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.name}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Επώνυμο μαθητή</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.studentsurname}}</div>
                  </div>
                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα Πατέρα</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.fatherfirstname}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Όνομα Μητέρας</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.motherfirstname}}</div>
                  </div>
                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Ημερομηνία Γέννησης</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.birthdate}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Τύπος απολυτηρίου</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.certificatetype}}</div>
                  </div>

                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Έτος κτήσης απολυτηρίου</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.graduation_year}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Σχολείο τελευταίας φοίτησης</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.lastschool_schoolname}}</div>
                  </div>

                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-3" style="font-size: 0.8em;">Σχολικό έτος τελευταίας φοίτησης</div>
                      <div class="col-md-3" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.lastschool_schoolyear}}</div>
                      <div class="col-md-3" style="font-size: 0.8em;">Τάξη τελευταίας φοίτησης</div>
                      <div *ngIf="StudentDetails$.lastschool_class === '1'" class="col-md-3" style="font-size: 0.8em; font-weight: bold">Α</div>
                      <div *ngIf="StudentDetails$.lastschool_class === '2'" class="col-md-3" style="font-size: 0.8em; font-weight: bold">Β</div>
                      <div *ngIf="StudentDetails$.lastschool_class === '3'" class="col-md-3" style="font-size: 0.8em; font-weight: bold">Γ</div>
                      <div *ngIf="StudentDetails$.lastschool_class === '4'" class="col-md-3" style="font-size: 0.8em; font-weight: bold">Δ</div>
                  </div>

                  <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-6" style="font-size: 0.8em;">Τάξη φοίτησης για το νέο σχολικό έτος</div>
                      <div *ngIf="StudentDetails$.currentclass === '1'" class="col-md-6" style="font-size: 0.8em; font-weight: bold">Α</div>
                      <div *ngIf="StudentDetails$.currentclass === '2'" class="col-md-6" style="font-size: 0.8em; font-weight: bold">Β</div>
                      <div *ngIf="StudentDetails$.currentclass === '3'" class="col-md-6" style="font-size: 0.8em; font-weight: bold">Γ</div>
                      <div *ngIf="StudentDetails$.currentclass === '4'" class="col-md-6" style="font-size: 0.8em; font-weight: bold">Δ</div>
                  </div>
                  <div *ngIf="StudentDetails$.currentclass === '2'" class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-6" style="font-size: 0.8em;">Τομέας φοίτησης για το νέο σχολικό έτος</div>
                      <div class="col-md-6" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.currentsector}}</div>
                  </div>
                  <div *ngIf="StudentDetails$.currentclass === '3' || StudentDetails$.currentclass === '4'" class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                      <div class="col-md-6" style="font-size: 0.8em;">Ειδικότητα φοίτησης για το νέο σχολικό έτος</div>
                      <div class="col-md-6" style="font-size: 0.8em; font-weight: bold">{{StudentDetails$.currentcourse}}</div>
                  </div>

                    <div class="row evenin" style="margin: 0px 2px 0px 2px; line-height: 2em;">
                        <div class="col-md-6" style="font-size: 1em; font-weight: bold;">Επιλογή ΕΠΑΛ</div>
                        <div class="col-md-6" style="font-size: 1em; font-weight: bold; text-align: center;">Σειρά Προτίμησης</div>
                    </div>

                    <div class="row oddin" style="margin: 0px 2px 0px 2px; line-height: 2em;" *ngFor="let epalChoices$  of EpalChosen$ | async; let i=index; let isOdd=odd; let isEven=even" [hidden]="UserData$.id !== userActive">
                        <div class="col-md-6" style="font-size: 0.8em; font-weight: bold;">{{epalChoices$.epal_id}}</div>
                        <div class="col-md-6" style="font-size: 0.8em; font-weight: bold; text-align: center;">{{epalChoices$.choice_no}}</div>
                    </div>

                    <div class="row" style="margin-top: 20px; margin-bottom: 20px;">
                        <div class="col-md-12">
                            <button type="button" class="btn-primary btn-lg pull-right isclickable" style="width: 10em;" (click)="createPdfServerSide()">
                                <span style="font-size: 0.9em; font-weight: bold;">Εκτύπωση(PDF)&nbsp;&nbsp;&nbsp;</span>
                            </button>
                        </div>

                    </div>
                    </div>
                </div>

              </div>
              </div>
              </div>

   `
})

@Injectable() export default class SubmitedPreview implements OnInit, OnDestroy {

    private SubmitedApplic$: BehaviorSubject<any>;
    private SubmitedUsersSub: Subscription;
    private SubmitedDetails$: BehaviorSubject<any>;
    private SubmitedDetailsSub: Subscription;
    private EpalChosen$: BehaviorSubject<any>;
    private EpalChosenSub: Subscription;
    private incomeChosen$: BehaviorSubject<any>;
    private incomeChosenSub: Subscription;
    private CritirioChosen$: BehaviorSubject<any>;
    private CritirioChosenSub: Subscription;
    private showLoader$: BehaviorSubject<boolean>;

    public StudentId;
    private userActive = <number>-1;

    @ViewChild('target') element: ElementRef;

    constructor(private _ngRedux: NgRedux<IAppState>,
        private _hds: HelperDataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        /*private fb: FormBuilder,*/
    ) {
        this.SubmitedApplic$ = new BehaviorSubject([{}]);
        this.SubmitedDetails$ = new BehaviorSubject([{}]);
        this.EpalChosen$ = new BehaviorSubject([{}]);
        this.CritirioChosen$ = new BehaviorSubject([{}]);
        this.incomeChosen$ = new BehaviorSubject([{}]);
        this.showLoader$ = new BehaviorSubject(false);

    }

    ngOnDestroy() {
        if (this.SubmitedUsersSub)
            this.SubmitedUsersSub.unsubscribe();
        if (this.SubmitedDetailsSub)
            this.SubmitedDetailsSub.unsubscribe();
        if (this.EpalChosenSub)
            this.EpalChosenSub.unsubscribe();
        if (this.CritirioChosenSub)
            this.CritirioChosenSub.unsubscribe();
        if (this.incomeChosenSub)
            this.incomeChosenSub.unsubscribe();

        this.SubmitedDetails$.unsubscribe();
        this.EpalChosen$.unsubscribe();
        this.SubmitedApplic$.unsubscribe();

    }

    ngOnInit() {

        this.showLoader$.next(true);

        this.SubmitedUsersSub = this._hds.getSubmittedPreviw().subscribe(
            data => {
                this.SubmitedApplic$.next(data);
                this.showLoader$.next(false);
            },
            error => {
                this.SubmitedApplic$.next([{}]);
                this.showLoader$.next(false);
                console.log("Error Getting Schools");
            },
            () => {
                console.log("Getting Schools")
                this.showLoader$.next(false);
            });

    }


    setActiveUser(ind: number): void {
        ind = +ind;
        if (ind === this.userActive) {
            ind = -1;
            return;
        }
        ind--;
        this.userActive = ind + 1;
        this.showLoader$.next(true);

        //OBSOLETE


        this.SubmitedDetailsSub = this._hds.getStudentDetails(this.userActive + 1).subscribe(data => {
            this.SubmitedDetails$.next(data);
            this.showLoader$.next(false);
        },
            error => {
                this.SubmitedDetails$.next([{}]);
                console.log("Error Getting Schools");
                this.showLoader$.next(false);
            },
            () => {
                console.log("Getting Schools");
                this.showLoader$.next(false);
            });


        this.EpalChosenSub = this._hds.getEpalchosen(this.userActive + 1).subscribe(data => {
            this.EpalChosen$.next(data)
        },
            error => {
                this.EpalChosen$.next([{}]);
                console.log("Error Getting Schools");
            },
            () => console.log("Getting Schools"));

    }

    createPdfServerSide() {
        //this._hds.createPdfServerSide(this.authToken, this.role, this.userActive +1 );
        this._hds.createPdfServerSide(this.userActive + 1);

    }

    deleteApplication(appId: number) : void {

    }

}
