import { Project } from "../../types/types";
import { connectToDatabase } from "../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //const { db } = await connectToDatabase();
//
  //const projetos = await db
  //  .collection("projetos")
  //  .find({})
  //  .sort({data_inicio : -1 })
  //  .toArray();
//
  //res.json(projetos);
  const projetos :Project[] = [
    {
      id: 1,
      name:"Projeto codelife",
      description:"O projeto CodeLife é uma iniciativa social que nasceu da convicção de que a educação em programação pode ser uma poderosa ferramenta para transformar vidas e comunidades. Inspirado pela visão de um futuro mais inclusivo, o projeto se dedica a levar o conhecimento tecnológico para regiões carentes, onde o acesso a recursos educacionais é limitado.Com uma equipe de voluntários apaixonados e comprometidos, o CodeLife visa oferecer oportunidades iguais para jovens de diferentes origens, capacitando-os com habilidades essenciais para o século XXI. Através de workshops, cursos e projetos práticos, os participantes mergulham no mundo da programação, aprendendo desde conceitos básicos até tópicos avançados.O impacto do projeto transcende o conhecimento técnico. À medida que os alunos desenvolvem suas habilidades, também cultivam confiança, resiliência e criatividade. Esses valores impulsionam sua autoestima e senso de propósito, preparando-os para enfrentar os desafios futuros com determinação.      Ao longo dos anos, o projeto CodeLife expandiu suas fronteiras, abrangendo diversas comunidades e alcançando um número crescente de participantes. O sucesso do projeto é alimentado pelas histórias inspiradoras de jovens que, através do conhecimento adquirido, encontram novas oportunidades e perspectivas em suas vidas.      CodeLife é mais do que um projeto de ensino de programação; é um movimento que procura democratizar a tecnologia e reduzir as desigualdades sociais. Com o apoio de parceiros e doadores, o projeto continua crescendo, promovendo um impacto positivo e duradouro nas vidas daqueles que toca.Em um mundo cada vez mais conectado, o CodeLife representa uma luz guia para uma sociedade mais inclusiva, onde a educação e o conhecimento são as chaves para um futuro melhor. Essa jornada é uma prova viva de que, quando a tecnologia e o coração se unem, podemos verdadeiramente empoderar comunidades e construir um mundo mais justo e igualitário.",
      start_date:"2021-01-01",
      thumb:"https://i.ytimg.com/vi/9ImSvqDDQuc/maxresdefault.jpg",
      members:[
        {
          id:'1',
          name:"João",
          email:"joao123@gmail.com",
          linkedin:"https://www.linkedin.com/in/joao123/",
          github:"https://github.com/joao123",
          urlImg:"https://github.com/joao123.png",
          role:'Desenvolvedor',
          statement:"Participar do projeto CodeLife foi gratificante, pois pude contribuir para levar a educação em programação a comunidades carentes. Ver o impacto positivo nas vidas dos alunos foi inspirador e reforçou minha paixão por desenvolver soluções que realmente fazem a diferença."
        },
        {
          id:'2',
          name:"Maria",
          email:"maria123@gmail.com",
          linkedin:"https://www.linkedin.com/in/maria123/",
          github:"https://github.com/maria123",
          urlImg:"https://github.com/maria123.png",
          role:'Web-Designer',
          statement:"O projeto CodeLife foi uma experiência única. A colaboração com colegas talentosos e a oportunidade de ensinar programação a jovens em comunidades desfavorecidas me proporcionaram crescimento pessoal e profissional inestimáveis. Sinto orgulho de fazer parte dessa iniciativa transformadora."
        }
      ],
      tutors:[
        {
          id:'1',
          name:"Sandro Renato Dias",
          email:"sandroRenato@gmail.com",
          linkedin:"https://www.linkedin.com/in/sandroRenato/",
          urlImg:"https://www.linkedin.com/in/sandroRenato/picture"
        },
        {
          id:'2',
          name:"André da cruz",
          email:"andredacruz@gmail.com",
          linkedin:"https://www.linkedin.com/in/andredacruz/",
          urlImg:"https://www.linkedin.com/in/andredacruz/picture"
        }
      ]
    }
  ]
  res.json(projetos)
};