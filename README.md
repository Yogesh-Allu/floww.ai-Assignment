# floww.ai-Assignment

### Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the server: `npm start`.
4. Use Postman or curl to interact with the API.


### API Endpoints

#### POST /transactions
- Adds a new transaction (income or expense).
- Request body:
  
1) POST http://localhost:3000/transactions/
   Content-Type : application/json 
  {
    "type": "income",
    "category": "salary",
    "amount": 5000,
    "date": "2024-10-22",
    "description": "October salary"
  } 

 2) GET http://localhost:3000/transactions

 3) GET http://localhost:3000/transactions/2

 4) PUT http://localhost:3000/transactions/4
    Content-Type : application/json
    {
    "type": "expenses",
    "category": "rent",
    "amount": 5000,
    "date": "2024-10-2",
    "description": "October rent"
  } 

  5) DELETE http://localhost:3000/transactions/3/

  6) GET http://localhost:3000/summary/
