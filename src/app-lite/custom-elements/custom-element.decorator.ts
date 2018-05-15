// import 'reflect-metadata';
export function CustomElement(customTagName: string): ClassDecorator {
  return function (constructor: any) {
    const annotations = constructor.__annotations__.slice();
    annotations[0].customTagName = customTagName;

    Object.defineProperty(constructor, '__annotations__', annotations);
  };
}

