import { Component, EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TicketFormComponent } from './ticket-form.component';

let exampleTicket = {
  _id: undefined,
  name: 'Sonic',
  website: 'http://www.sonic.com',
  description: 'Short bio'
};

@Component({
  template: '<ticket-form [ticket]="actualTicket" (saved)="onSave($event)"></ticket-form>'
})
class TestComponent {
  actualTicket = exampleTicket;

  constructor() {
    this.saveFinished = new EventEmitter();
  }

  onSave(ticket) {
    this.saveCall = ticket;
    this.saveFinished.emit();
  }
}

describe('FormComponent', () => {
  function assertInputFields(element) {
    expect(element.querySelector('#ticket-name').value).toBe(exampleTicket.name);
    expect(element.querySelector('#ticket-website').value).toBe(exampleTicket.website);
    expect(element.querySelector('#ticket-description').value).toBe(exampleTicket.description);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketFormComponent, TestComponent],
      imports: [FormsModule, ReactiveFormsModule]
    });
  });

  describe('as a Component', () => {
    it('should create form group in constructor and bind it to input elements', () => {
      let fixture = TestBed.createComponent(TicketFormComponent);
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;

      component.ticketForm.controls['name'].setValue('Sonic');
      component.ticketForm.controls['website'].setValue('http://www.sonic.com');
      component.ticketForm.controls['description'].setValue('Short bio');
      fixture.detectChanges();

      assertInputFields(element);
    });

    it('should update input fields based on input changes', () => {
      let fixture = TestBed.createComponent(TicketFormComponent);
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;

      component.ngOnChanges({
        ticket: {
          currentValue: exampleTicket
        }
      });
      fixture.detectChanges();

      assertInputFields(element);
    });

    it('should notify when form is submitted', () => {
      let fixture = TestBed.createComponent(TicketFormComponent);
      let component = fixture.componentInstance;

      component.saved.subscribe((value) => {
        expect(value).toBe(exampleTicket);
      });

      component.onSubmit(exampleTicket);
    });

    it('should notify when submit button is clicked', () => {
      let fixture = TestBed.createComponent(TicketFormComponent);
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;

      component.ngOnChanges({
        ticket: {
          currentValue: exampleTicket
        }
      });
      fixture.detectChanges();

      component.saved.subscribe((value) => {
        expect(value).toEqual(exampleTicket);
      });

      element.querySelector('button[type=submit]').click();
    });
  });

  describe('as a Directive', () => {
    it('should accept ticket input from parent component and display it in input fields', () => {
      let fixture = TestBed.createComponent(TestComponent);
      let element = fixture.nativeElement;

      fixture.detectChanges();

      assertInputFields(element);
    });

    it('should notify parent component when submit button is clicked', () => {
      let fixture = TestBed.createComponent(TestComponent);
      let component = fixture.componentInstance;
      let element = fixture.nativeElement;

      fixture.detectChanges();

      component.saveFinished.subscribe(() => {
        let value = component.actualTicket;
        delete value._id;
        expect(value).toEqual(exampleTicket);
      });

      element.querySelector('button[type=submit]').click();
      fixture.detectChanges();
    });
  });
});
