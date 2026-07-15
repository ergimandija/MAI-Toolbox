import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLanding } from './chat-landing';

describe('ChatLanding', () => {
  let component: ChatLanding;
  let fixture: ComponentFixture<ChatLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
