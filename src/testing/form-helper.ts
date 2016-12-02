import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

export function setInputValue (fixture: ComponentFixture<any>, selector: string, value: any): Promise<any> {
  let el = fixture.debugElement.query(By.css(selector)).nativeElement;
  el.value = value;
  el.dispatchEvent(new Event('input'));
  return fixture.whenStable();
}

export function getInputValue (fixture: ComponentFixture<any>, selector): any {
  return fixture.debugElement.query(By.css(selector)).nativeElement.value;
}

export function dispatchEvent (fixture: ComponentFixture<any>, selector: string, event: string | Event): Promise<any> {
  let el = fixture.debugElement.query(By.css(selector)).nativeElement;

  if (typeof event === 'string') {
    el.dispatchEvent(new Event(event));
  }
  else {
    el.dispatchEvent(event);
  }
  return fixture.whenStable();
}

