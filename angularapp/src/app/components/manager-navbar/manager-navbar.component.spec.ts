import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerNavbarComponent } from './manager-navbar.component';

describe('ManagerNavbarComponent', () => {
  let component: ManagerNavbarComponent;
  let fixture: ComponentFixture<ManagerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagerNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
