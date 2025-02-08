# Questionpro-assignment
# Grocery Booking API  

A simple Node.js and TypeScript-based Grocery Booking API using Prisma, PostgreSQL, and Docker.

## 🚀 Features  

- **Admin**  
  - Add, update, and remove grocery items  
  - Manage inventory levels  
  - View all orders placed by users  

- **User**  
  - View available grocery items  
  - Book multiple grocery items in a single order  

## 🏗️ Tech Stack  

- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: PostgreSQL with Prisma ORM  
- **Containerization**: Docker & Docker Compose  

---

## 🛠️ Installation  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/prathameshpatil7/qp-assessment.git
cd grocery-booking-api
```

### 2️⃣ Install Dependencies  

```bash
npm install
```

### 3️⃣ Setup Environment Variables  

Create a `.env` file in the root directory and add:

```
DATABASE_URL=postgresql://admin:password@db:5432/grocerydb
PORT=5000
JWT_SECRET="your_jwt_secret"
```

### 4️⃣ Run Migrations  

```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the API  

```bash
npm run dev
```

---

## 📌 API Endpoints  

### 🔹 **Authentication**  
| Method | Endpoint           | Description         | Role |
|--------|-------------------|---------------------|------|
| `POST` | `/auth/register` | Register a user | User/Admin |
| `POST` | `/auth/login`    | Login and get token | User/Admin |

### 🔹 **Grocery Items**  
| Method | Endpoint           | Description         | Role |
|--------|-------------------|---------------------|------|
| `POST` | `/admin/grocery`    | Add grocery item | Admin |
| `GET`  | `/admin/grocery`    | Get all groceries | User/Admin |
| `PUT`  | `/admin/grocery/:id` | Update grocery item | Admin |
| `DELETE` | `/admin/grocery/:id` | Delete grocery item | Admin |
| `DELETE` | `/admin/orders` | View all grocery orders | Admin |

### 🔹 **Orders**  
| Method | Endpoint         | Description       | Role |
|--------|-----------------|-------------------|------|
| `POST` | `/user/order`    | Place an order   | User |
| `GET`  | `/user/grocery`    | View all groceries available  | User |
