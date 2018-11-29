import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleUserComponent } from './edit-single-user.component';

describe('EditSingleUserComponent', () => {
  let component: EditSingleUserComponent;
  let fixture: ComponentFixture<EditSingleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSingleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
