import { Pool } from 'pg'
import dotenv from 'dotenv'
import bcryptjs from 'bcryptjs'

dotenv.config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE
})

function processDBError(err) {
  return {
    error: true,
    code: err.code,
    message: err.hint
  }
}

export async function addUser (req,res) {
  const { fullname, email } = req.body
  const salt = await bcryptjs.genSalt(10)
  const password = await bcryptjs.hash(req.body.password,salt)

  try {
    const response = await pool.query('insert into users (fullname, email,password) values ($1, $2, $3)',[fullname, email, password])
    return res.status(200).json({
      error: false,
      message: 'User created successfully'
    })
  } catch (error) {
    return res.status(500).json(processDBError(error))
  }
}

export async function getUser (req,res) {
  const id = req.params.id;

  try {
    const response = await pool.query('select id, fullname, email, created_at, updated_at from users where id = $1',[id])
    return res.status(200).json(response.rows)
  } catch (error) {
    return res.status(500).json(processDBError(error))
  }
}

export async function getUsers (req,res) {
  try {
    const response = await pool.query('select id, fullname, email, created_at, updated_at from users')
    return res.status(200).send(response.rows)  
  } catch (error) {
    return res.status(500).json(processDBError(error))
  }
  
}

export async function deleteUser (req,res) {
  const id = req.params.id

  try {
    const response = await pool.query('delete from users where id = $1',[id])
    res.status(200).json({
      error: false,
      message: 'User deleted successfully'
    })
  } catch (error) {
    res.status(500).json(processDBError(error)) 
    
  }
}

export async function updateUser (req,res) {
  const id = req.params.id
  const { fullname, email } = req.body
  const salt = await bcryptjs.genSalt(10)
  const password = await bcryptjs.hash(req.body.password,salt)

  try {    
    const response = await pool.query(`update users set 
        fullname = '${fullname}', 
        email = '${email}', 
        password = '${password}', 
        updated_at = NOW()
      where id = ${id}`)
    if (response.rowCount > 0) 
      return res.status(200).json({
        error: false,
        message: 'User updated successfully'
      })
    else
      return res.status(200).json({
        error: false,
        message: 'User not found'
      })
  } catch (error) {
    res.status(500).json(processDBError(error))
  }
}