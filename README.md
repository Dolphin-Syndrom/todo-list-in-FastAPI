# Todo List Application

A full-stack todo list application built with FastAPI, React, and MongoDB.

## Tech Stack

- **Backend**: FastAPI with Python
- **Frontend**: React with Vite
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd todo-list-in-FastAPI
```

2. Set up environment variables
```bash
cp .env.example .env
```

3. Run with Docker
```bash
docker-compose up --build
```

## Access

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Development

### Local Development (without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7
```

### Docker Development

```bash
# Start all services
docker-compose up

# Rebuild and start
docker-compose up -d --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

## API Endpoints

- `GET /api/todo` - Get all todos
- `POST /api/todo` - Create a new todo
- `GET /api/todo/{id}` - Get a specific todo
- `PUT /api/todo/{id}` - Update a todo
- `DELETE /api/todo/{id}` - Delete a todo

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_ROOT_USERNAME` | MongoDB username | `admin` |
| `MONGO_ROOT_PASSWORD` | MongoDB password | `password` |
| `MONGO_DATABASE` | Database name | `todoapp` |
| `BACKEND_PORT` | Backend port | `8000` |
| `FRONTEND_PORT` | Frontend port | `5173` |
