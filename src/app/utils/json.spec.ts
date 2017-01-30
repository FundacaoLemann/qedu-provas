import * as json from './json';

describe('camelize', () => {
  it('should return johnDoe', () => {
    expect(json.camelize('john_doe')).toEqual('johnDoe');
  });
});

describe('camelizeObject', () => {
  let obj = { first_name: "john", last_name: "Doe" };
  let d2 = {
    firstName: 'john',
    lastName: 'Doe',
    others: {
      firstName: 'HELLO',
      lastName: 'WORLD',
      many: {
        firstName: 'mad',
        lastName: 'world'
      }
    }
  };

  it('should camelcase the object keys', () => {
    expect(json.camelizeObject(obj)).toEqual({ firstName: 'john', lastName: 'Doe' });
  });

  it('should camelcase the object and the children keys', () => {
    expect(json.camelizeObject(d2)).toEqual({
      firstName: 'john',
      lastName: 'Doe',
      others: {
        firstName: 'HELLO',
        lastName: 'WORLD',
        many: {
          firstName: 'mad',
          lastName: 'world'
        }
      }
    });
  });
});