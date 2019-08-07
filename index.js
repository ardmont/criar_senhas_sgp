const csv = require('fast-csv')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const ws = fs.createWriteStream("resultado.csv")

fs.createReadStream('arquivo.csv')
  .pipe(csv.parse({ headers: true }))
  .on('data', (row) => {
    const cpf = row.cpf
    const encryptedPassword = bcrypt.hashSync(row.cpf, 11)
    //console.log(row)
    console.log(`CPF: ${cpf} - Senha: ${encryptedPassword}`)
  })
  .on('end', () => {
    console.log('Arquivo lido com sucesso!')
    /* csv
      .write(data, { headers: true })
      .pipe(ws) */
  })
