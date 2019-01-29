import { Item } from '../../app/shared/model/item';
import { Option } from '../../app/shared/model/option';

export class ItemFixture {
  static get(): Item {
    const o1 = new Option({
      id: 1,
      text:
        '<p>“Sem entregar spoilers, basta dizer que o conflito principal diz respeito ao retorno de alguns animais ao comportamento selvagem de antigamente...”&nbsp;</p>',
    });

    const o2 = new Option({
      id: 2,
      text:
        '<p>“Zootopia demonstra grande criatividade no desenvolvimento deste mundo animal”.&nbsp;</p>',
    });

    const o3 = new Option({
      id: 3,
      text:
        '<p>“A Walt Disney Animation Studios é conhecida por desenvolver as suas histórias em cenários descolados...”&nbsp;</p>',
    });

    const o4 = new Option({
      id: 4,
      text:
        '<p>“A trama se inicia quando predadores e presas já eliminaram seu comportamento animalesco ancestral”&nbsp;</p>',
    });

    return new Item({
      id: '5bb50984b25229001a535915',
      text:
        '<h5 style="text-align:center;"><strong>Zootopia: Essa Cidade é o Bicho<br>Como nascem os preconceitos<br>por Bruno Carmelo</strong></h5>\n<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;O Walt Disney Animation Studios é conhecido por desenvolver as suas histórias em cenários descolados da atualidade, sejam eles futuristas (Operação Big Hero) ou antigos (Frozen – Uma aventura Congelante), passando por universos mágicos (Detona Ralph) e fabulares (Enrolados). O filme Zootopia: Essa Cidade é o Bicho representa a trama mais realista do estúdio até então. Embora seus personagens sejam animais, a ideia inicial é desenvolvida de maneira verdadeira, com elementos facilmente reconhecíveis pelo público.</p>\n<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;[...]</p>\n<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;Zootopia demonstra grande criatividade no desenvolvimento deste mundo animal. A trama se inicia quando predadores e presas já eliminaram seu “comportamento animalesco ancestral” para viverem em harmonia.</p>\n<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;[...]</p>\n<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;Sem entregar spoilers, basta dizer que o conflito principal diz respeito ao retorno de alguns animais ao comportamento selvagem de antigamente. Através da metáfora do comportamento selvagem, a Disney conseguiu representar os perigos que destroem as sociedades intolerantes de hoje em dia.</p>\n<p style="text-align:right;">(Texto adaptado disponível em http://www.adorocinema.com/filmes/filme-223207/criticas-adorocinema/. Acesso em 08/03/2017)</p>\n<p><strong>RESPONDA:</strong>&nbsp;</p>\n<p>A frase que expressa à opinião do autor do texto é:</p>\n',
      answers: [o1, o2, o3, o4],
      media: [],
    });
  }
}
