import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PresentationComponent } from '../../../../src/app/pages/presentation/presentation.component';

describe('[PresentationComponent]', () => {
  let component: PresentationComponent;
  let fixture: ComponentFixture<PresentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentationComponent);
    component = fixture.componentInstance;
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
