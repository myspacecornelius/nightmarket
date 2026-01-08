# Dharma

A hyperlocal sneaker marketplace and community platform with real-time activity feeds, geospatial listings, and a token-based reward system.

## Quick Start

### Prerequisites

- **Docker Desktop** — [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** — [Download here](https://git-scm.com/downloads)

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/myspacecornelius/Night_Market.git
cd Night_Market

# 2. Create environment file
make setup

# 3. Start all services
make up
```

Wait ~60 seconds for services to initialize, then open:

| Service   | URL                          |
|-----------|------------------------------|
| Frontend  | <http://localhost:5177>      |
| API       | <http://localhost:8000>      |
| API Docs  | <http://localhost:8000/docs> |
| Grafana   | <http://localhost:3001>      |

### Seed Demo Data (Optional)

```bash
docker compose exec api python -m services.seed
```

---

## Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Frontend   | React, Vite, TailwindCSS, TypeScript |
| Backend    | FastAPI, SQLAlchemy, Pydantic        |
| Database   | PostgreSQL + PostGIS                 |
| Cache      | Redis                                |
| Workers    | Celery                               |
| Monitoring | Prometheus, Grafana                  |
| Container  | Docker Compose                       |

---

## Project Structure

```text
├── frontend/           # React application
│   └── src/
│       ├── components/ # UI components
│       ├── pages/      # Page views
│       ├── hooks/      # Custom React hooks
│       ├── lib/        # API client, utilities
│       └── features/   # Feature modules
├── services/           # FastAPI backend
│   ├── routers/        # API endpoints
│   ├── models/         # SQLAlchemy models
│   ├── schemas/        # Pydantic schemas
│   ├── core/           # Business logic, auth, geo
│   ├── middleware/     # Request middleware
│   └── alembic/        # Database migrations
├── worker/             # Celery background tasks
├── infra/              # Prometheus/Grafana config
├── tests/              # Test suite
└── docker-compose.yml  # Service orchestration
```

---

## Make Commands

```bash
make help      # Show all commands
make up        # Start all services
make down      # Stop all services
make logs      # Tail service logs
make status    # Show container status
make doctor    # Check environment health
make migrate   # Run database migrations
make seed      # Populate demo data
make test      # Run test suite
make clean     # Remove containers and volumes
make reset     # Full reset (removes images too)
```

---

## Key Features

- **Hyperlocal Marketplace** — H3-indexed listings ranked by proximity
- **Real-time Activity Feed** — WebSocket-powered live updates
- **Neighborhood Heat Index** — Demand metrics per micro-neighborhood
- **Trade Matching** — Suggested swaps based on inventory/wishlist
- **LACES Token Economy** — Rewards for community participation
- **Leaderboards** — Track top contributors

---

## API Overview

### Core Endpoints

```text
POST   /auth/register           # Create account
POST   /auth/login              # Get JWT token
GET    /users/me                # Current user profile

GET    /v2/feed/hyperlocal      # Nearby listings
GET    /v2/feed/heat-index      # Neighborhood demand
GET    /v2/feed/activity-ribbon # Recent activity
GET    /v2/feed/trade-matches   # Trade suggestions

POST   /v2/listings             # Create listing
GET    /v2/listings/{id}        # Listing detail
POST   /v2/listings/{id}/save   # Bookmark listing

GET    /leaderboard             # Top users
GET    /health                  # Service health
```

### WebSocket

```text
WS /ws/activity           # Real-time feed events
WS /ws/listing/{id}       # Listing updates
```

Full API documentation at `http://localhost:8000/docs`

---

## Environment Variables

Copy `.env.example` to `.env` (done automatically by `make setup`).

Key variables:

```bash
DATABASE_URL=postgresql://dharma:password@postgres:5432/dharma
REDIS_URL=redis://redis:6379/0
JWT_SECRET_KEY=your-secret-key
API_PORT=8000
FRONTEND_PORT=5177
```

---

## Troubleshooting

**Services won't start?**

```bash
make doctor          # Check prerequisites
docker compose logs  # View error output
```

**Database issues?**

```bash
make migrate         # Re-run migrations
make clean && make up  # Fresh start
```

**Port conflicts?**
Edit `.env` to change `API_PORT` or `FRONTEND_PORT`.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Submit a pull request

---

## License

MIT License — see [LICENSE](LICENSE) for details.
