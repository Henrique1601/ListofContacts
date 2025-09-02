const mongoose = require('mongoose')

const ContactsListSchema = new mongoose.Schema({
  Nome: { type: String, required: true },
  Email: { type: String, required: false },
  Telefone: { type: String, required: true },
  WhatsApp: { type: String, required: true },
  Mensagem: { type: String, required: false },
  Nascimento: { type: String, required: false },
  Endereco: { type: String, required: false },
  IMG: { type: String, default: '' },
  Categoria: { type: String, required: false }
})

const ContactsList = mongoose.model('ContactsList', ContactsListSchema, 'ContactsList')

module.exports = ContactsList