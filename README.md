# NGC-API-NestJs
API em NodeJS / NestJs

Sobre: API Desenvolvida em NodeJs utilizando o framework Nestjs com a linguagem de programação TypeScrpit, aplicação devidamente dockerizada e testada em um banco de dados Postgres Local documentada no endereço http://localhost:8080/swagger

Formas de rodar: 
npm run start:dev para rodar na porta http://localhost:3000
docker-compose up para rodar no endereço http://localhost:8080

Documentação da API em: http://localhost:8080/swagger ou http://localhost:3000/swagger

Vídeo de apresentação do resultado do desafio 100% atendido em: https://www.youtube.com/watch?v=ySKWOLUbPcE

Formas de utilizar / Requisitos do Desafio

- Um servidor em Node.js utilizando Typescript; - Feito Utilizando Framework NestJs - OK
- Um ORM de sua preferência; - Utilização do TypeORM para a estruturação das tabelas do banco de dados e relacionamentos entre entidades - OK
- Um bancos de dados PostgreSQL. - Utilização do banco Postgres em conjunto com o Docker - OK

- Tabela Users - Com relacionamento 1 para 1 com o id da tabela Accounts e 1 para N com a tabela Transactions - OK
- Tabela Accounts - OK
- Tabela Transactions - Relacionamento com a tabela Users - OK

Regras de Negócio

Cadastro:

http://localhost:8080/users/signin

{
	"username" : "Raissa A",
	"senha" : "5Testeteste"
}

Conforme solicitado apenas um Username válido e senha devem ser informados, com alguns requisitos, username deve ter mais de 3 dígitos e senha ao menos 1 número e 1 letra maiúscula com mais de 8 dígitos
A senha é colocada no banco hasheada
Uma conta é criada para o novo usuário com um balance de 100 reais:

{
	"username": "Raissa A",
	"senha": "$2b$11$HQPZnxCGJwJFvrZ.RGN72.9TM4FWyTN3Xldip0tFyvSa9Yz5JpRq.",
	"accountId": {
		"balance": 100,
		"id": 9
	},
	"id": 9
}

Token JWT e Login com balance atual:

No endpoint http://localhost:8080/auth/login a partir do username e senha informado corretamente, um token jwt com validade de 1 dia é gerado:
{
	"username" : "Raissa A",
	"senha" : "5Testeteste"
}

{
	"acess_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhaXNzYSBBIiwic2VuaGEiOiIkMmIkMTEkSFFQWm54Q0dKd0pGdnJaLlJHTjcyLjlUTTRGV3lUTjNYbGRpcDB0Rnl2U2E5WXo1SnBScS4iLCJpYXQiOjE2Njg3OTE1OTMsImV4cCI6MTY2ODc5MTY1M30.eSH4qGKirgszZ2vcYV4jSybPL50wz_NTe67C60TIlzI"
}

No endpoint http://localhost:8080/users/login as informações da conta são obtidas caso seja informado um Bearer token - jwt válido, mostrando apenas o balance do usuário que fez login:
{
	"id": 9,
	"username": "Raissa A",
	"senha": "$2b$11$HQPZnxCGJwJFvrZ.RGN72.9TM4FWyTN3Xldip0tFyvSa9Yz5JpRq.",
	"accountId": {
		"id": 9,
		"balance": 105,
		"transacoesDebitadas": [],
		"transacoesCreditadas": [
			{
				"id": 15,
				"value": 5,
				"createdAt": "2022-11-18"
			}
		]
	}
}

A partir dos relacionamentos das tabelas, informações de transações também podem ser obtidas aqui e manipuladas no front-end

Realização de Transação:

http://localhost:8080/transactions

deve ser passado como parâmetro a seguinte entrutura JSON:

{
	"usernameLogado" : "Raissa A",
	"usernameReceptor" : "Murillo A",
	"value" : 5
}

Realizando uma manipulação correta no front-end o usernameLogado deve ser sempre o respecrtivo nome do user que realizou o login

Resultado da requisição:

{
	"createdAt": "2022-11-18",
	"value": 5,
	"debitedAccountId": {
		"id": 8,
		"balance": 95
	},
	"creditedAccountId": {
		"id": 9,
		"balance": 105
	},
	"id": 15
}

Uma nova entrada na tabela de transações foi criada e a transação só é possível acontecer caso um token válido esteja sendo informado.

Filtro de transações:

Todos os seguintes endpoints também requisitarão um token válido JWT para seu devido funcionamento:

Por Data:

{
	"id" : 8,
	"databuscada" : "2022-11-18"
}

Necessário informar uma estrutura JSON contendo o id do usuário logado e a data que deseja filtrar, e obtém do servidor uma lista com todas as transações do dia:
[
	{
		"id": 15,
		"value": 5,
		"createdAt": "2022-11-18"
	}
]

{
	"id" : 8,
	"databuscada" : "2022-11-17"
}

resultado:

[]

Não haviam transações para a conta de id 8 no dia 17/11

Filtro de Cash-Out:

http://localhost:8080/transactions/cashout/8

Informando apenas o id do usuário logado já é obtido as informações corretas:

[
	{
		"id": 15,
		"value": 5,
		"createdAt": "2022-11-18"
	}
]

Uma lista com todas as transações de cash-out

Filtro de Cash-In:

http://localhost:8080/transactions/cashin/8

Informando apenas o id do usuário logado já é obtido as informações corretas:

[]

Uma lista com todas as transações de cash-in, neste caso o usuário com id 8 ainda não recebeu dinheiro algum

Filtro todas as transações de uma conta:

http://localhost:8080/transactions/8

[
	{
		"id": 15,
		"value": 5,
		"createdAt": "2022-11-18",
		"debitedAccountId": {
			"id": 8,
			"balance": 100
		},
		"creditedAccountId": {
			"id": 9,
			"balance": 100
		}
	},
	{
		"id": 16,
		"value": 5,
		"createdAt": "2022-11-18",
		"debitedAccountId": {
			"id": 9,
			"balance": 100
		},
		"creditedAccountId": {
			"id": 8,
			"balance": 100
		}
	}
]

Apenas informar o id do usuário logado e já é devolvido da API uma lista com todas as transações que esta conta realizou, além das informações de qual conta foi creditada e qual foi debitada.
A cada requisição o balance em tempo real também é mostrado, portanto a lógica principal para o front-end deve ser avaliada a partir da informação de debitedAccount e creditedAccount, de maneira que, caso o id da conta debitada seja o mesmo que o id do usuário logado a personalização da listagem pode ser vermelha, e quando o id do usuário for igual ao da conta creditada a listagem ser verde, indicando processos diferentes.

Sendo assim, a partir da explicação da utilização de cada endpopint, todos os requisitos solicitados para o desafio backend foram atendidos.

Me coloco à disposição para batermos um papo, 

Antensiosamente,

Murillo Alcantara