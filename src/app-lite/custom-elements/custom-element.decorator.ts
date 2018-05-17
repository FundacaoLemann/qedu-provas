import { getAnnotations } from './get-annotations.function';

export function CustomElement(customTagName: string): ClassDecorator {
  return function(constructor: any) {
    const annotations = getAnnotations(constructor);
    annotations.customTagName = customTagName;

    Object.defineProperty(constructor, '__annotations__', annotations);
  };
}
