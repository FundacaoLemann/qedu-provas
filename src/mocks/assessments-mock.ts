import { Assessment } from "../app/shared/model/assessment";

export const ASSESSMENTS: Assessment[] = [
  {
    uuid: '1',
    title: 'Língua Portuguesa',
    instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perspiciatis quos a ad veniam, voluptates voluptatum labore, dignissimos dolorem laudantium inventore fugit doloremque temporibus qui reprehenderit minima aut unde provident cumque numquam consectetur. Quasi impedit, quibusdam totam cupiditate illo laborum dolorem omnis laboriosam esse voluptates, vel tenetur est ut, non numquam voluptas repudiandae ullam veritatis blanditiis! Quibusdam, ea laboriosam tenetur delectus obcaecati minima repellendus, molestias. Cumque, sequi. Architecto rerum amet recusandae. Similique libero rerum facilis commodi architecto consectetur dignissimos deserunt, expedita incidunt voluptatibus voluptatem, perspiciatis iusto impedit itaque. Illo aliquid aut modi assumenda ducimus perspiciatis voluptatum quis ipsa placeat autem. Amet assumenda sint enim veniam aliquid incidunt aperiam, animi beatae.',
    duration: 1,
    grade: [
      {
        id: 'AI1',
        title: 'Anos Iniciais 1'
      },
      {
        id: 'AI2',
        title: 'Anos Iniciais 2'
      },
      {
        id: 'AI3',
        title: 'Anos Iniciais 3'
      }
    ],
    author: {
      uuid: 'O9G36yAxQU',
      name: 'Renan Azevedo'
    },
    application_date: new Date(),
    items_count: 10,
    questions: [
      {
        id: 1,
        text: `
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Amet aspernatur dicta explicabo in nam non nulla, officia 
          possimus repellendus voluptatibus. Adipisci alias assumenda 
          facilis harum illum laborum neque nostrum reprehenderit.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dolore inventore ipsa maxime modi nam placeat quis temporibus 
          voluptatum. Labore, suscipit?
        `,
        answers: [
          {
            id: 1,
            text: 'Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses.'
          },
          {
            id: 2,
            text: 'Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce.'
          },
          {
            id: 3,
            text: 'Oh, never lead a shark.'
          },
          {
            id: 4,
            text: 'The collision course is a distant space suit.'
          },
          {
            id: 5,
            text: 'Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus.'
          }
        ]
      },
      {
        id: 2,
        text: 'Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms',
        answers: [
          {
            id: 1,
            text: 'Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses.'
          },
          {
            id: 2,
            text: 'Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce.'
          },
          {
            id: 3,
            text: 'Oh, never lead a shark.'
          },
          {
            id: 4,
            text: 'The collision course is a distant space suit.'
          },
          {
            id: 5,
            text: 'Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus.'
          }

        ]
      },

    ],
    version: 1,
  },
  {
    uuid: '2',
    title: 'Língua Portuguesa 2',
    instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perspiciatis quos a ad veniam, voluptates voluptatum labore, dignissimos dolorem laudantium inventore fugit doloremque temporibus qui reprehenderit minima aut unde provident cumque numquam consectetur. Quasi impedit, quibusdam totam cupiditate illo laborum dolorem omnis laboriosam esse voluptates, vel tenetur est ut, non numquam voluptas repudiandae ullam veritatis blanditiis! Quibusdam, ea laboriosam tenetur delectus obcaecati minima repellendus, molestias. Cumque, sequi. Architecto rerum amet recusandae. Similique libero rerum facilis commodi architecto consectetur dignissimos deserunt, expedita incidunt voluptatibus voluptatem, perspiciatis iusto impedit itaque. Illo aliquid aut modi assumenda ducimus perspiciatis voluptatum quis ipsa placeat autem. Amet assumenda sint enim veniam aliquid incidunt aperiam, animi beatae.',
    duration: 120,
    grade: [
      {
        id: 'AI1',
        title: 'Anos Iniciais 1'
      }
    ],
    author: {
      uuid: 'O9G36yAxQU',
      name: 'Renan Azevedo'
    },
    application_date: new Date(),
    items_count: 20,
    questions: [
      {
        id: 1,
        text: 'Drain zucchini smoothly, then mix with salad cream and serve quickly in cooker.',
        answers: [
          {
            id: 1,
            text: 'Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses.'
          },
          {
            id: 2,
            text: 'Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce.'
          },
          {
            id: 3,
            text: 'Oh, never lead a shark.'
          },
          {
            id: 4,
            text: 'The collision course is a distant space suit.'
          },
          {
            id: 5,
            text: 'Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus.'
          }
        ]
      },
      {
        id: 2,
        text: 'Wow, courage!Lord, ye cold jack- set sails for adventure! Dozens of anomalies will be lost in plasmas like attitudes in alarms',
        answers: [
          {
            id: 1,
            text: 'Cum lumen assimilant, omnes rationees tractare fortis, neuter urbses.'
          },
          {
            id: 2,
            text: 'Place the margerine in a fine-mesh strainer, and flavor fairly with divided BBQ sauce.'
          },
          {
            id: 3,
            text: 'Oh, never lead a shark.'
          },
          {
            id: 4,
            text: 'The collision course is a distant space suit.'
          },
          {
            id: 5,
            text: 'Talis, nobilis adiurators acceleratrix experientia de flavum, festus lapsus.'
          }

        ]
      },

    ],
    version: 1,
  }
];
