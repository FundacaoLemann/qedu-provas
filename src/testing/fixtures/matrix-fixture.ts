import { Matrix } from '../../app/shared/model/matrix';
import { ItemFixture } from './item-fixture';

export class MatrixFixture {
  static get(): Matrix {
    const m = new Matrix();
    m.id = '5bb505a8b25229009c535914';
    m.title = 'Avaliação de Mogi das Cruzes: 5º ano - Outubro/2018';
    m.grade = 5;
    m.numberOfItems = 1;
    m.subjects = ['Língua Portuguesa', 'Matemática'];
    m.items = [ItemFixture.get()];

    return m;
  }
}
