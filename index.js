const express = require('express');
const bodyParsed = require('body-parser');
const app = express();

app.use(bodyParsed.json());

const filmes = [{ id: 1, titulo: 'Vingadores: Ultimato', descricao: 'Os Vingadores se unem para derrotar Thanos.' }, 
{ id: 2, titulo: 'Vingadores: Guerra Infinita', descricao: 'Thanos busca as Joias do Infinito para destruir metade do universo.' },
 { id: 3, titulo: 'Vingadores: Era de Ultron', descricao: 'Os Vingadores confrontam o robô Ultron.' }, 
{ id: 4, titulo: 'Vingadores', descricao: 'Os Vingadores se unem para deter Loki e seus aliados.' }, 
{ id: 5, titulo: 'Vingadores: A Era de Ultron - Extras'}
];

let filmesAlugados = [];

app.get('/filmes', (req,res)=>{
    res.json(filmes);
});

app.post('/alugar',(req, res) =>{
    const {nome, id} = req.body;
    const  filme = filmes.find(f => f.id == id);

    if(!filme){
        res.status(404).json({"mensagem":"filme não encontrado"});
    }
    if(filmesAlugados.some(f => f.filme.id == id)){
        res.status(400).json({"mensagem": "filme já alugado"});

    }else{
        filmesAlugados.push({nome, filme});
        res.json({"mensagem":`O filme ${filme.titulo} foi alugado por ${nome}`});
    }
      
});

app.get('/filmesAlugados', (req, res)=>{
    res.send(filmesAlugados)
});

app.put('/entregar', (req,res)=>{
   const id = req.body.id;
   const index = filmesAlugados.findIndex(f => f.filme.id == parseInt(id));
   
   if(index == -1){
    res.status(404).json({"mensage":"O filme não está alugado"})
   }
   filmesAlugados.splice(index, 1);
   res.json({"mensagem": "O filme foi entregue com sucesso"});
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log({"mensagem":`servidor rodando na porta${PORT}`})
})