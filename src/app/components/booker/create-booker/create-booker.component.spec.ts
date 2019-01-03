import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookerComponent } from './create-booker.component';

describe('CreateBookerComponent', () => {
  let component: CreateBookerComponent;
  let fixture: ComponentFixture<CreateBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
