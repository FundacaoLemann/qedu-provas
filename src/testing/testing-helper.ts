import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';

export function setInputValue(fixture: ComponentFixture<any>, selector: string, value: any): Promise<any> {
  const el = fixture.debugElement.query(By.css(selector)).nativeElement;
  el.value = value;
  el.dispatchEvent(new Event('input'));
  return fixture.whenStable();
}

export function getInputValue(fixture: ComponentFixture<any>, selector): any {
  return fixture.debugElement.query(By.css(selector)).nativeElement.value;
}

export function dispatchEvent(fixture: ComponentFixture<any>, selector: string, event: string | Event): Promise<any> {
  const el = fixture.debugElement.query(By.css(selector)).nativeElement;

  if (typeof event === 'string') {
    el.dispatchEvent(new Event(event));
  } else {
    el.dispatchEvent(event);
  }
  return fixture.whenStable();
}

export function getNativeElement(fixture: ComponentFixture<any>, selector): any {
  return fixture.debugElement.query(By.css(selector)).nativeElement;
}

export function getAllNativeElements(fixture: ComponentFixture<any>, selector): any[] {
  const nativeElements = [];
  const elements = fixture.debugElement.queryAll(By.css(selector));

  for (const debugElement of elements) {
    nativeElements.push(debugElement.nativeElement);
  }

  return nativeElements;
}

export function getDebugElement(fixture: ComponentFixture<any>, selector: string): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

export function getAllDebugElements(fixture: ComponentFixture<any>, selector: string): DebugElement[] {
  return fixture.debugElement.queryAll(By.css(selector));
}


/**
 * Create a fake Response object
 * @param status
 * @param statusText
 * @param body
 * @returns {Response}
 */
export function createResponse (status: number, statusText: string, body: {} | string): Response {
  const respBody = (typeof body === 'object') ? JSON.stringify(body) : body;
  const options = {
    status: status,
    statusText: statusText,
    body: respBody
  };

  return new Response(new ResponseOptions(options));
}
