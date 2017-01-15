/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MeningsPusselComponent } from './menings-pussel.component';

describe('MeningsPusselComponent', () => {
  let component: MeningsPusselComponent;
  let fixture: ComponentFixture<MeningsPusselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeningsPusselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeningsPusselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
