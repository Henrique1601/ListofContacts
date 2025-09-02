const express = require('express')
const router = express.Router()
const CreateSchemaCont = require('./CreateSchemaContacts')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error(err)
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Criar contato
router.post('/create',authMiddleware, async (req, res) => {
  const { Nome, Email, Telefone, WhatsApp, Mensagem, Nascimento, Endereco, Categoria } = req.body
  let img =  ''
  try{
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Contacts'
      })
      img = result.secure_url
    }
    const newContact = new CreateSchemaCont({
      Nome,
      Email,
      Telefone,
      WhatsApp,
      Mensagem,
      Nascimento,
      Endereco,
      Categoria
    })
    await newContact.save()
    res.status(201).json(newContact)
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Obter todos os contatos
router.get('/', async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    const searchRegex = { $regex: search, $options: 'i' };
    query = {
      $or: [
        { Nome: searchRegex },
        { Email: searchRegex },
        { Telefone: searchRegex },
        { WhatsApp: searchRegex },
        { Nascimento: searchRegex },
        { Endereco: searchRegex },
        { Categoria: searchRegex }
      ],
    };
  }
  console.log('Query:', query)
  try {
    const contacts = await CreateSchemaCont.find(query);
    res.status(200).json(contacts)

  } catch (err) {
    console.error(err)
    console.error('Erro ao listar contatos:', err);
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Editar
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { Nome, Email, Telefone, WhatsApp, Mensagem, Nascimento, Endereco, Categoria } = req.body
  try {
    const updatedContact = await CreateSchemaCont.findByIdAndUpdate(id, {
      Nome,
      Email,
      Telefone,
      WhatsApp,
      Mensagem,
      Nascimento,
      Endereco,
      Categoria
    }, { new: true })
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' })
    }
    res.status(200).json(updatedContact)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// Deletar contato
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const deletedContact = await CreateSchemaCont.findByIdAndDelete(id)
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' })
    }
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router