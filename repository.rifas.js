import { query } from "../database/sqlite.js";
import { db } from "../database/sqlite.js";

async function Listar() {

   
    
    let sql = "select * from viveiros ";

   

    const rifas = await query(sql);

    return rifas;
}
async function ListarViveiros() {

    
    let sql = "select * from viveiros ";
    sql = sql + "order by id"

    const viveiros = await query(sql);

    return viveiros;
}

async function ListarNumero(numero, body) {
    
    
    let sql = `select numero from viveiros where numero = ? `;

           
   
const viveiros = await query(sql, [numero]);

return viveiros[numero];

}

        


async function Inserir(id, numero) {

    let sql = `insert into viveiros (id, numero) values(?,?)
    `;

       
     const viveiros = await query(sql, [id, numero]);

    return viveiros[0];

}

//async function Mover(numero) {
//
//  
 //   db.serialize(() => {
 //       db.get('SELECT * FROM viveiros WHERE numero = ?', [numero], (err, row) => {
//    
 //         if (err) {//
 //           console.error(err);
//            
//          } else if (row) {//
//            db.run('DELETE FROM viveiros WHERE numero = ?', [numero]);
 //           db.run('INSERT INTO viveirosvendido (numero) VALUES (?)', [numero]);
 //           console.log(`Número ${numero} movido com sucesso!`);
//          } else {
//            console.log(`Número ${numero} não encontrado em viveiros!`);
//          }
 //       });
 //     });
     
  //  };
  
  async function Mover(numeros) {
    if (!Array.isArray(numeros) || numeros.length === 0) {
      console.log("Nenhum número válido para mover.");
      return;
    }
  
    db.serialize(() => {
      numeros.forEach((numero) => {
        db.get('SELECT * FROM viveiros WHERE numero = ?', [numero], (err, row) => {
          if (err) {
            console.error(`Erro ao buscar número ${numero}:`, err);
          } else if (row) {
            db.run('DELETE FROM viveiros WHERE numero = ?', [numero], (err) => {
              if (err) {
                console.error(`Erro ao deletar número ${numero}:`, err);
              } else {
                db.run('INSERT INTO viveirosvendido (numero) VALUES (?)', [numero], (err) => {
                  if (err) {
                    console.error(`Erro ao inserir número ${numero} em viveirosvendido:`, err);
                  } else {
                    console.log(`Número ${numero} movido com sucesso!`);
                  }
                });
              }
            });
          } else {
            console.log(`Número ${numero} não encontrado em viveiros!`);
          }
        });
      });
    });
  }
  



const criarTabela = (nomeTabela, valor, quantidadeNumeros) => {
    // serialize serve para executar um comando por vez
    db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS ${nomeTabela} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
            valor REAL,
          numero INTEGER
            
        );
      `);

      const arrayNumeros = [];
    for (let i = 1; i <= quantidadeNumeros; i++) {
    arrayNumeros.push(i);
  }

       
     for (let i = 0; i <= quantidadeNumeros; i++) {   
    db.run(`insert into  ${nomeTabela} (valor, numero) values(?,?); 
    ` ,[valor, arrayNumeros[i]]);
    }
    
});

const Rifas = ([nomeTabela, valor, quantidadeNumeros]);

return Rifas[0];
}       

export default { Inserir, Listar, criarTabela, ListarViveiros, Mover, ListarNumero}  

