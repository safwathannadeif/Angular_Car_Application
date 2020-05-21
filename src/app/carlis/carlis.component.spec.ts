import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlisComponent } from './carlis.component';

describe('CarlisComponent', () => {
  let component: CarlisComponent;
  let fixture: ComponentFixture<CarlisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarlisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarlisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
