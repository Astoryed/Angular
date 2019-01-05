import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFrieghtComponent } from './view-frieght.component';

describe('ViewFrieghtComponent', () => {
  let component: ViewFrieghtComponent;
  let fixture: ComponentFixture<ViewFrieghtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFrieghtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFrieghtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
