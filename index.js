const exp = require('constants')
const express = require('express')
const { appendFile } = require('fs/promises')
const { request } = require('http')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express() 

app.use(express.json())

const dbPath =  path.join(__dirname,"flowwAi.db")

let db=null

const intialiseDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error :${e.message}`)
    process.exit(1)
  }
}

intialiseDBAndServer()

app.post('/transactions/', async(request,response)=>{
  const{addvalues}=request.body
  const{type,category, amount, date, description}=addvalues
  const addQuery = `INSERT INTO transactions(type,category,amount,date,description) values ('${type}','${category}',${amount},'${date}','${description}');`
  const dbResponse = await db.run(addQuery)
  response.send("Transaction added successfully")
})

app.get('/transactions/', async(request,response)=>{
  const getQuery = 'select * from transactions;'
  const dbResponse= await db.all(getQuery)
  response.send(dbResponse)
})

app.get('/transactions/:id', async(request,response)=>{
  const{id}=request.params
  const getQuery = `select * from transactions where id = ${id};`
  const dbResponse = await db.get(getQuery)
  response.send(dbResponse)
})

app.put('/transactions/:id',async(request,response)=>{
  const{id}=request.params
  const values = request.body 
  const{type,category, amount, date, description} = values
  const putQuery = `update transactions set type='${type}', category='${category}', amount=${amount}, date='${date}', description='${description}';`
  const dbResponse = await db.run(putQuery)
  response.send("Transaction successfully updated")
})

app.delete('/transactions/:id',async(request,response)=>{
  const{id} = request.params
  const deleteQuery = `delete from transactions where id=${id};`
  const dbResponse = await db.run(deleteQuery)
  response.send("Transaction successfully deleted")
})

app.get('/summary/', async(request,response)=>{
  const incomeQuery = `select SUM(amount) as TotalIncome from transactions where type='income';`
  const expensesQuery = `select SUM(expenses) as TotalExpenses from transactions where type='expenses';`
  const income=await db.all(incomeQuery)
  const expenses = await db.all(expensesQuery)
  const balance = income-expenses
  const dbResponse = `{
  income:'${income}',
  expenses:'${expenses}',
  balance:'${balance}'
  }`
  response.send(dbResponse)
})

module.exports=app