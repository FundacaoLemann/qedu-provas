import { Assessment } from '../model/assessment';

export const ASSESSMENTS: Assessment[] = [
	{
		uuid: 'DdMRnyqjHN',
		title: 'Lingua Portuguesa',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perspiciatis quos a ad veniam, voluptates voluptatum labore, dignissimos dolorem laudantium inventore fugit doloremque temporibus qui reprehenderit minima aut unde provident cumque numquam consectetur. Quasi impedit, quibusdam totam cupiditate illo laborum dolorem omnis laboriosam esse voluptates, vel tenetur est ut, non numquam voluptas repudiandae ullam veritatis blanditiis! Quibusdam, ea laboriosam tenetur delectus obcaecati minima repellendus, molestias. Cumque, sequi. Architecto rerum amet recusandae. Similique libero rerum facilis commodi architecto consectetur dignissimos deserunt, expedita incidunt voluptatibus voluptatem, perspiciatis iusto impedit itaque. Illo aliquid aut modi assumenda ducimus perspiciatis voluptatum quis ipsa placeat autem. Amet assumenda sint enim veniam aliquid incidunt aperiam, animi beatae.',
		duration: 120,
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
		version: 1.0
	},
	{
		uuid: 'qaQJDBHRyL',
		title: 'Lingua Portuguesa 2',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti perspiciatis quos a ad veniam, voluptates voluptatum labore, dignissimos dolorem laudantium inventore fugit doloremque temporibus qui reprehenderit minima aut unde provident cumque numquam consectetur. Quasi impedit, quibusdam totam cupiditate illo laborum dolorem omnis laboriosam esse voluptates, vel tenetur est ut, non numquam voluptas repudiandae ullam veritatis blanditiis! Quibusdam, ea laboriosam tenetur delectus obcaecati minima repellendus, molestias. Cumque, sequi. Architecto rerum amet recusandae. Similique libero rerum facilis commodi architecto consectetur dignissimos deserunt, expedita incidunt voluptatibus voluptatem, perspiciatis iusto impedit itaque. Illo aliquid aut modi assumenda ducimus perspiciatis voluptatum quis ipsa placeat autem. Amet assumenda sint enim veniam aliquid incidunt aperiam, animi beatae.',
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
		version: 1.0
	}
];

