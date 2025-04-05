# MoneySmartApp Backend

This is the Flask backend for the MoneySmartApp financial planner application. It provides authentication API endpoints for user registration and login using MongoDB, as well as dashboard data endpoints.

## Setup

1. Make sure you have Python 3.8+ installed
2. Create and activate a virtual environment:

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```

4. Configure the environment variables:
   - The `.env` file already contains the MongoDB connection string and a default secret key
   - In production, you should change the secret key

## Running the server

Start the Flask development server:

```bash
python app.py
```

The server will run on http://localhost:5000.

## API Endpoints

### Authentication

#### Registration
- URL: `/api/register`
- Method: `POST`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- Success Response:
  - Status: 201
  - Body: 
    ```json
    {
      "message": "User registered successfully",
      "token": "jwt-token-here",
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "JO",
        "role": "Standard User"
      }
    }
    ```

#### Login
- URL: `/api/login`
- Method: `POST`
- Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "message": "Login successful",
      "token": "jwt-token-here",
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "JO",
        "role": "Standard User"
      }
    }
    ```

#### Get Current User
- URL: `/api/user`
- Method: `GET`
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "user": {
        "id": "user-id",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "JO",
        "role": "Standard User"
      }
    }
    ```

### Dashboard Data

All dashboard endpoints require authentication using the JWT token.

#### Dashboard Summary
- URL: `/api/dashboard/summary`
- Method: `GET`
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "accounts": {
        "data": [
          {
            "id": "account-id",
            "name": "Cash Account",
            "type": "Cash",
            "balance": 1500,
            "currency": "USD"
          }
        ],
        "total_balance": 1500
      },
      "transactions": {
        "recent": [
          {
            "id": "transaction-id",
            "date": "2023-05-15T10:30:00",
            "description": "Grocery shopping",
            "amount": 120.50,
            "category": "Food",
            "type": "expense"
          }
        ]
      },
      "budgets": {
        "data": [
          {
            "id": "budget-id",
            "category": "Food",
            "amount": 500,
            "spent": 320,
            "period": "monthly"
          }
        ],
        "total": 500,
        "spent": 320,
        "remaining": 180
      },
      "goals": {
        "data": [
          {
            "id": "goal-id",
            "name": "Emergency Fund",
            "target_amount": 10000,
            "current_amount": 2500,
            "deadline": "2023-12-31T00:00:00",
            "priority": "high"
          }
        ],
        "total": 10000,
        "current": 2500,
        "progress": 25
      },
      "summary": {
        "net_worth": 1500,
        "income_this_month": 3000,
        "expenses_this_month": 1200,
        "savings_rate": 25
      }
    }
    ```

#### Accounts
- URL: `/api/dashboard/accounts`
- Method: `GET`
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "accounts": [
        {
          "id": "account-id",
          "name": "Cash Account",
          "type": "Cash",
          "balance": 1500,
          "currency": "USD"
        }
      ],
      "total_balance": 1500
    }
    ```

#### Transactions
- URL: `/api/dashboard/transactions`
- Method: `GET`
- Query Parameters:
  - `limit`: Number of transactions to return (default: 10)
  - `skip`: Number of transactions to skip (for pagination)
  - `category`: Filter by category
  - `type`: Filter by type (income/expense)
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "transactions": [
        {
          "id": "transaction-id",
          "date": "2023-05-15T10:30:00",
          "description": "Grocery shopping",
          "amount": 120.50,
          "category": "Food",
          "type": "expense"
        }
      ],
      "total_count": 1,
      "current_page": 1,
      "total_pages": 1
    }
    ```

#### Budgets
- URL: `/api/dashboard/budgets`
- Method: `GET`
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "budgets": [
        {
          "id": "budget-id",
          "category": "Food",
          "amount": 500,
          "spent": 320,
          "period": "monthly"
        }
      ],
      "total": 500,
      "spent": 320,
      "remaining": 180
    }
    ```

#### Goals
- URL: `/api/dashboard/goals`
- Method: `GET`
- Headers:
  ```
  Authorization: Bearer jwt-token-here
  ```
- Success Response:
  - Status: 200
  - Body: 
    ```json
    {
      "goals": [
        {
          "id": "goal-id",
          "name": "Emergency Fund",
          "target_amount": 10000,
          "current_amount": 2500,
          "deadline": "2023-12-31T00:00:00",
          "priority": "high"
        }
      ],
      "total": 10000,
      "current": 2500,
      "progress": 25
    }
    ``` 