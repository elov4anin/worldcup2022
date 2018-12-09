import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MaterialDatepicker, MaterialService} from '../../shared/classes/material.service';
import {BidsService} from '../../shared/services/bids.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy, AfterViewInit {
  form: FormGroup;
  aSub: Subscription;
  @ViewChild('birthday') birthdayRef: ElementRef;
  birthday: MaterialDatepicker;
  private isValid = false;

  constructor(
    private _bidsService: BidsService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  ngAfterViewInit() {
    this.birthday = MaterialService.initDatePicker(this.birthdayRef, this.validate.bind(this));
  }

  onSelect (e) {
    console.log(e);
  }

  validate() {
    if (!this.birthday.date) {
      this.isValid = true;
      return;
    }

    this.isValid =  true;

  }
  onSubmit() {
    this.form.disable();

    this.aSub = this._bidsService.create(this.form.value).subscribe(
      () => this._router.navigate(['/history']),
      error1 => {
        MaterialService.toast(error1.error.message);
        this.form.enable();
      }
    );

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
