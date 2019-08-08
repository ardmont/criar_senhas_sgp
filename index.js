const csv = require('fast-csv')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const ws = fs.createWriteStream('resultado.csv')

const users = [] // Irá guardar os usuários após a criação dos hashs

fs.createReadStream('arquivo.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    const encryptedPassword = bcrypt.hashSync(row.cpf, 11) // Cria o hash para a senha, com 11 rounds, utilizando o cpf
    const user = { ...row, encrypted_password: encryptedPassword } // Passa a senha para o objeto contendo os dados do usuário
    users.push(user) // Guarda os dados do usuário no array
    console.log(user)
  })
  .on('end', () => {
    console.log('Arquivo lido com sucesso!')
    csv
      .write(users, { headers: true }) // Escreve um novo csv contendo os hashes
      .pipe(ws)
  })
