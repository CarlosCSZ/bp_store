import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PresentationComponent } from '../../../../src/app/pages/presentation/presentation.component';

describe('[PresentationComponent]', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  }));

  test('should create', waitForAsync(() => {
    expect(component).toBeTruthy();
  }));

  test('should update searchedValue on keyup event', fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'random value';
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick();

    expect(component.searchedValue()).toEqual('random value');
  }));

  test('should only accept strings in searchedValue', fakeAsync(() => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick();

    expect(component.searchedValue()).toEqual('123');
  }));
});
