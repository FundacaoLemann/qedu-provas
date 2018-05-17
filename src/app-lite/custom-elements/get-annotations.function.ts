export function getAnnotations(constructor: any): Object {
  const annotations = constructor.__annotations__;

  if (!annotations) {
    throw new Error('Missing annotations on class.');
  }

  return annotations[0];
}
