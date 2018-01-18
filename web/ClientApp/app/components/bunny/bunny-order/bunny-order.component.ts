import { Observable } from 'rxjs/Rx';
import { GenericValidator } from '../../shared/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName } from '@angular/forms';
import { IBunny } from '../bunny.model';
import { Subscription } from 'rxjs/Subscription';

const validationMessages = {
  name: {
    required: 'Name is required.',
    minlength: 'Name must be at least three characters.',
    maxlength: 'Name cannot exceed 50 characters.'
  },
  email: {
    email: 'Email must be in the form name@domain'
  }
};

@Component({
  selector: 'app-bunny-order',
  templateUrl: './bunny-order.component.html',
  styleUrls: ['./bunny-order.component.css']
})
export class BunnyOrderComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle = 'Bunny Order Form';
  bunny: IBunny;
  orderForm: FormGroup;
  validator: GenericValidator;
  displayMessage: { [key: string]: string } = {};

  private routeSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private dataService: DataService) {
      this.validator = new GenericValidator(validationMessages);
    }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]
      ],
      email: ['', Validators.email],
      bunnyName: ''
    });

    this.routeSubscription = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.dataService.getBunny(id)
          .subscribe(bunny => this.onBunnyRetrieved(bunny));
      }
    );
  }

  onBunnyRetrieved(bunny: IBunny): void {
    if (this.orderForm) {
      this.orderForm.reset();
    }
    this.bunny = bunny;
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.orderForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.validator.processMessages(this.orderForm);
    });
}

  public ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
