# 📊 Dharma Codebase Analysis & Index

**Generated:** December 27, 2025  
**Project:** Dharma - The Underground Network for Sneaker Culture  
**Repository:** https://github.com/myspacecornelius/nightmarket.git

---

## 📁 Project Structure Overview

```
dharma/
├── services/              # FastAPI Backend
│   ├── core/              # Business logic & utilities
│   ├── models/            # SQLAlchemy database models
│   ├── routers/           # API endpoints
│   ├── middleware/        # Request middleware
│   ├── schemas/           # Pydantic schemas
│   ├── alembic/           # Database migrations
│   ├── checkout/          # Sneaker checkout automation
│   ├── monitor/           # Store monitoring service
│   └── proxy/             # Proxy management service
├── frontend/              # React + Vite + TypeScript
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # API client & utilities
│       ├── layouts/       # Layout components
│       ├── types/         # TypeScript types
│       └── tests/         # Frontend tests
├── worker/                # Celery background tasks
├── infra/                 # Prometheus & Grafana configs
├── modelsrv/              # ML model serving
└── docs/                  # Documentation
```

---

## 🏗️ Technology Stack

| Layer | Technology | Version/Details |
|-------|------------|-----------------|
| **Backend Framework** | FastAPI | Async Python API |
| **Database** | PostgreSQL + PostGIS | Geospatial support |
| **ORM** | SQLAlchemy | Database operations |
| **Cache** | Redis | Caching & queues |
| **Task Queue** | Celery | Background jobs |
| **Frontend** | React + Vite | TypeScript, Tailwind CSS |
| **Monitoring** | Prometheus + Grafana | Metrics & dashboards |
| **Container** | Docker Compose | Orchestration |
| **Error Tracking** | Sentry | Optional integration |

---

## 📊 Database Models Index

### Core User & Auth
| Model | File | Description |
|-------|------|-------------|
| `User` | `models/user.py` | User accounts |
| `UserSession` | `models/session.py` | JWT sessions with device fingerprinting |

### Content & Social
| Model | File | Description |
|-------|------|-------------|
| `Post` | `models/post.py` | Community posts |
| `Signal` | `models/signal.py` | Hyperlocal sneaker signals |
| `Like` | `models/like.py` | Post likes |
| `Save` | `models/save.py` | Saved posts |
| `Repost` | `models/repost.py` | Reposts |
| `Subscription` | `models/subscription.py` | User subscriptions |

### Marketplace (Feed v2)
| Model | File | Description |
|-------|------|-------------|
| `Listing` | `models/listing.py` | Sneaker listings |
| `ListingSave` | `models/listing.py` | Saved listings |
| `FeedEvent` | `models/feed_event.py` | Activity stream events |
| `NeighborhoodHeatIndex` | `models/heat_index.py` | Demand metrics per H3 cell |
| `TradeMatch` | `models/trade_match.py` | Trade suggestions |
| `UserWishlist` | `models/trade_match.py` | User wishlists |

### Drops & Locations
| Model | File | Description |
|-------|------|-------------|
| `Drop` | `models/drop.py` | Sneaker drops |
| `Store` | `models/drop.py` | Retail stores |
| `DropStore` | `models/drop.py` | Drop-store associations |
| `DropZone` | `models/dropzone.py` | Community meetup zones |
| `DropZoneMember` | `models/dropzone.py` | Zone memberships |
| `DropZoneCheckIn` | `models/dropzone.py` | Check-in records |
| `Location` | `models/location.py` | User locations |
| `Release` | `models/release.py` | Release calendar |

### Token Economy
| Model | File | Description |
|-------|------|-------------|
| `LacesLedger` | `models/laces.py` | LACES token transactions |
| `HeatMapTile` | `models/heat_map_tile.py` | Cached heatmap data |

### Automation
| Model | File | Description |
|-------|------|-------------|
| `CheckoutTaskResult` | `models/checkout.py` | Checkout task results |

---

## 🔌 API Endpoints Index

### Authentication (`/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/token` | Login (OAuth2 password flow) |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Logout & revoke session |
| GET | `/auth/me` | Get current user |

### Users (`/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/` | Create user |
| GET | `/users/` | List users |

### Posts (`/posts`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/posts/` | Create post |
| GET | `/posts/feed` | Get user feed |
| GET | `/posts/global` | Get global feed |
| GET | `/posts/user/{id}` | Get user's posts |
| DELETE | `/posts/{id}` | Delete post |

### Signals (`/signals`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signals/` | Create signal |
| GET | `/signals/` | List signals |
| GET | `/signals/heatmap` | Get heatmap data |
| GET | `/signals/stats` | Get statistics |
| POST | `/signals/{id}/boost` | Boost signal |

### LACES Token (`/v1/laces`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/laces/balance` | Get LACES balance |
| GET | `/v1/laces/ledger` | Transaction history |
| GET | `/v1/laces/opportunities` | Earning opportunities |
| POST | `/v1/laces/daily-stipend` | Claim daily stipend |
| POST | `/v1/laces/grant` | Admin grant (admin only) |
| POST | `/v1/laces/boost-post/{id}` | Boost post with LACES |

### Drop Zones (`/v1/dropzones`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/dropzones` | List drop zones |
| POST | `/v1/dropzones` | Create drop zone |
| GET | `/v1/dropzones/{id}` | Get details |
| POST | `/v1/dropzones/{id}/checkin` | Check in |
| POST | `/v1/dropzones/{id}/join` | Join zone |

### Marketplace Feed v2 (`/v2`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v2/feed/hyperlocal` | Hyperlocal listings |
| GET | `/v2/feed/heat-index` | Neighborhood heat |
| GET | `/v2/feed/heat-index/map` | Heatmap data |
| GET | `/v2/feed/activity-ribbon` | Activity ticker |
| GET | `/v2/feed/trade-matches` | Trade suggestions |
| POST | `/v2/feed/trade-matches/{id}/accept` | Accept trade |
| POST | `/v2/feed/trade-matches/{id}/decline` | Decline trade |
| POST | `/v2/listings` | Create listing |
| GET | `/v2/listings/{id}` | Get listing |
| POST | `/v2/listings/{id}/save` | Save listing |
| DELETE | `/v2/listings/{id}/save` | Unsave listing |
| POST | `/v2/listings/{id}/price-drop` | Drop price |
| POST | `/v2/listings/{id}/sold` | Mark sold |

### WebSocket Streams
| Endpoint | Description |
|----------|-------------|
| `/ws/activity` | Real-time feed events by geo |
| `/ws/listing/{id}` | Real-time listing updates |

### Other Endpoints
| Router | Prefix | Description |
|--------|--------|-------------|
| `drops` | `/drops` | Drop management |
| `stores` | `/stores` | Store management |
| `releases` | `/releases` | Release calendar |
| `heatmap` | `/v1/heatmap` | Legacy heatmap |
| `dashboard` | `/dashboard` | Analytics dashboard |
| `uploads` | `/uploads` | S3 presigned URLs |
| `shop` | `/v1/shop` | Checkout task shop |

---

## 🎨 Frontend Components Index

### Core Components
| Component | Path | Description |
|-----------|------|-------------|
| `AppShell` | `layouts/AppShell.tsx` | Main app layout |
| `ProtectedRoute` | `auth/ProtectedRoute.tsx` | Auth route guard |
| `ThemeProvider` | `components/ThemeProvider.tsx` | Theme management |
| `ErrorBoundary` | `components/ErrorBoundary.tsx` | Error handling |

### Marketplace
| Component | Path | Description |
|-----------|------|-------------|
| `ListingCard` | `components/marketplace/ListingCard.tsx` | Listing display |
| `ActivityRibbon` | `components/marketplace/ActivityRibbon.tsx` | Activity ticker |
| `TradeMatchCard` | `components/marketplace/TradeMatchCard.tsx` | Trade suggestions |

### Hyperlocal
| Component | Path | Description |
|-----------|------|-------------|
| `WalletDrawer` | `components/hyperlocal/WalletDrawer.tsx` | LACES wallet |
| `DropCard` | `components/hyperlocal/DropCard.tsx` | Drop display |
| `QuestCard` | `components/hyperlocal/QuestCard.tsx` | Quest display |
| `WarRoomPane` | `components/hyperlocal/WarRoomPane.tsx` | War room UI |

### Maps
| Component | Path | Description |
|-----------|------|-------------|
| `BaseMap` | `components/map/BaseMap.tsx` | Base map component |
| `HeatMapOverlay` | `components/map/HeatMapOverlay.tsx` | Heat overlay |
| `DropZoneLayer` | `components/map/DropZoneLayer.tsx` | Drop zones layer |

### Dashboard
| Component | Path | Description |
|-----------|------|-------------|
| `MetricsCard` | `components/dashboard/MetricsCard.tsx` | Metric display |
| `ActivityChart` | `components/dashboard/ActivityChart.tsx` | Activity chart |
| `RecentActivity` | `components/dashboard/RecentActivity.tsx` | Activity feed |
| `QuickActions` | `components/dashboard/QuickActions.tsx` | Action buttons |

### Pages
| Page | Path | Description |
|------|------|-------------|
| `Home` | `pages/Home.tsx` | Landing page |
| `Feed` | `pages/Feed.tsx` | Main feed |
| `MarketplacePage` | `pages/MarketplacePage.tsx` | Marketplace |
| `HeatMapPage` | `pages/HeatMapPage.tsx` | Heat map |
| `DropZonesPage` | `pages/DropZonesPage.tsx` | Drop zones |
| `ProfilePage` | `pages/ProfilePage.tsx` | User profile |
| `LoginPage` | `pages/LoginPage.tsx` | Login |
| `Laces` | `pages/Laces.tsx` | LACES wallet |

---

## 🔧 Core Utilities Index

### Geospatial (`services/core/`)
| Module | Key Functions | Description |
|--------|---------------|-------------|
| `h3_geo.py` | `coords_to_h3()`, `get_radius_hexes()` | Uber H3 helpers |
| `geohash_utils.py` | `GeohashUtils.encode()`, `SignalAggregator` | Geohash utilities |
| `geospatial.py` | `haversine_distance()`, `encode_geohash()` | Basic geo functions |

### Authentication (`services/core/`)
| Module | Key Functions | Description |
|--------|---------------|-------------|
| `auth.py` | `create_token_pair()`, `get_current_user()` | JWT auth |
| `security.py` | `verify_password()`, `get_password_hash()` | Password utilities |
| `password.py` | `PasswordPolicy.validate()` | Password policy |

### Infrastructure (`services/core/`)
| Module | Key Functions | Description |
|--------|---------------|-------------|
| `config.py` | `Settings` | Pydantic settings |
| `redis_client.py` | `get_redis()` | Redis connection |
| `cache.py` | `CacheStrategy` | Cache utilities |
| `rate_limiting.py` | `RateLimiter` | Rate limiting |
| `s3.py` | `create_presigned_url()` | S3 uploads |

### Frontend Hooks (`frontend/src/hooks/`)
| Hook | Description |
|------|-------------|
| `useAuth` | Authentication state |
| `useLaces` | LACES balance & operations |
| `useDropZones` | Drop zone operations |
| `useSignals` | Signal operations |
| `useListings` | Listing operations |
| `useWebSocket` | WebSocket connection |
| `useActivityFeed` | Activity feed |
| `useInfiniteScroll` | Infinite scroll |

---

## 🔴 Critical Issues

### 1. Authentication Incomplete
**Status:** 🔴 Critical  
**Location:** `services/core/auth.py`, various routers  
**Issue:** Authentication is partially stubbed. Many endpoints use placeholder `user_id` instead of actual authenticated users.  
**Impact:** Security vulnerability - unauthorized access possible.

**Affected Endpoints:**
- LACES endpoints use hardcoded user IDs
- Some post endpoints lack proper auth validation
- Session management incomplete

**Recommendation:**
```python
# Ensure all protected endpoints use:
current_user: User = Depends(get_current_active_user)
```

### 2. Missing Backend Tests
**Status:** 🔴 Critical  
**Location:** `tests/` directory  
**Issue:** Root tests folder only contains `Demo Audit.result` - no actual pytest test files.  
**Impact:** No automated verification of API behavior, regressions possible.

**Recommendation:**
- Add pytest test suite
- Test all API endpoints
- Add integration tests for database operations
- Target 80%+ coverage

### 3. Database Migration Gap
**Status:** 🟡 High  
**Location:** `services/alembic/versions/`  
**Issue:** LACES schema updates pending (missing `balance_after` column, new transaction types).  
**Impact:** Runtime errors if code expects columns that don't exist.

**Recommendation:**
```bash
cd services
alembic revision --autogenerate -m "add laces schema updates"
alembic upgrade head
```

---

## 🟡 Medium Priority Issues

### 4. Duplicate Geospatial Code
**Status:** 🟡 Medium  
**Locations:**
- `services/core/geohash_utils.py`
- `services/core/geospatial.py`
- `services/core/h3_geo.py`
- `services/routers/dropzones_ext.py` (has own `haversine_distance`)

**Recommendation:** Consolidate into single `services/core/geo/` module.

### 5. Frontend Structure Inconsistencies
**Status:** 🟡 Medium  
**Issues:**
- Multiple layout patterns (`app/_layout/`, `layouts/`, `components/dharma/`)
- Duplicate components (`ErrorBoundary` exists in two locations)
- Empty feature directory (`frontend/src/features/items/`)
- Types duplicated between `api-client.ts` and `types/` folder

**Recommendation:**
- Establish clear directory conventions
- Remove empty/duplicate directories
- Generate types from OpenAPI spec

### 6. API Versioning Inconsistency
**Status:** 🟡 Medium  
**Issues:**
- Mixed patterns: `/v1/`, `/v2/`, and unversioned endpoints
- No clear versioning strategy documented

**Recommendation:**
- Standardize all routes under `/api/v{n}/`
- Document versioning policy

### 7. Error Handling
**Status:** 🟡 Medium  
**Issues:**
- No standard error response schema
- Frontend has inconsistent error handling
- Mock data fallbacks mixed with error handling

**Recommendation:**
- Create `ErrorResponse` Pydantic model
- Implement global exception handler
- Standardize frontend error states

---

## 🟢 Feature Recommendations

### 8. Search & Discovery
**Current State:** Basic filtering exists  
**Recommendation:**
- Add Meilisearch or Elasticsearch for full-text search
- Implement faceted filtering (brand, size, condition)
- Add auto-complete suggestions

### 9. Notification System
**Current State:** Basic UI components exist, no backend  
**Recommendation:**
- Add notification model & endpoints
- Implement web push notifications
- Email notifications for trades
- In-app notification center

### 10. Admin Panel
**Current State:** Basic drop importer in `services/admin/`  
**Recommendation:**
- Build full admin dashboard
- Content moderation tools
- User management
- LACES economy controls
- Consider react-admin or similar

### 11. Image Processing
**Current State:** S3 upload with presigned URLs  
**Recommendation:**
- Add image optimization/compression
- Generate thumbnails
- Add sneaker authenticity verification (ML)

### 12. Real-time Enhancements
**Current State:** WebSocket infrastructure exists  
**Recommendation:**
- Live bidding on listings
- Real-time chat between traders
- Live drop countdowns
- Push notifications integration

### 13. Analytics Dashboard
**Current State:** Grafana for infrastructure  
**Recommendation:**
- User-facing analytics
- Seller insights (views, saves, conversion)
- Market trend analysis
- LACES economy metrics

---

## 📦 Dependencies Review

### Backend (`requirements.txt`)
| Package | Usage | Notes |
|---------|-------|-------|
| `fastapi` | Web framework | ✅ Good choice |
| `sqlalchemy` | ORM | ✅ Standard |
| `pydantic-settings` | Config | ✅ Modern approach |
| `celery` | Background tasks | ✅ Standard |
| `redis` | Cache/queue | ✅ Standard |
| `geohash2` | Geohashing | ✅ Lightweight |
| `h3` | Uber H3 | ✅ Excellent for hyperlocal |
| `sentry-sdk` | Error tracking | ✅ Optional but good |

### Frontend (`package.json`)
| Package | Usage | Notes |
|---------|-------|-------|
| `react` | UI framework | ✅ Standard |
| `vite` | Build tool | ✅ Modern, fast |
| `tailwindcss` | Styling | ✅ Good choice |
| `axios` | HTTP client | ✅ Standard |
| `react-router-dom` | Routing | ✅ Standard |
| `zustand` | State management | ✅ Lightweight |

---

## 🔒 Security Checklist

| Item | Status | Notes |
|------|--------|-------|
| JWT Authentication | 🟡 Partial | Needs completion |
| Password Hashing | ✅ Done | Using passlib |
| CORS Configuration | ✅ Done | Env-based |
| Rate Limiting | ✅ Done | Middleware in place |
| SQL Injection | ✅ Protected | Using SQLAlchemy ORM |
| CSRF Protection | 🔴 Missing | Needs implementation |
| Security Headers | ✅ Done | Middleware in place |
| Input Validation | 🟡 Partial | Pydantic, but inconsistent |
| Secrets Management | 🟡 Partial | .env, needs vault for prod |
| Audit Logging | 🔴 Missing | Needs implementation |

---

## 📈 Performance Considerations

### Current Optimizations ✅
- Redis caching for heatmap (5-min TTL)
- PostGIS spatial indexes
- Geohash aggregation for data transfer reduction
- Celery for async operations
- Pagination on list endpoints

### Recommended Additions
- Database connection pooling configuration
- Query result caching
- CDN for static assets
- HTTP/2 support
- Gzip compression

---

## 🚀 Quick Wins

1. **Add pre-commit hooks** - black, ruff, eslint
2. **Remove empty directories** - `features/items/`
3. **Add `.env` validation** - Ensure required vars set
4. **Generate OpenAPI docs** - Auto-generate TypeScript types
5. **Add health checks** - All services should have `/health`
6. **Implement request logging** - Structured logging middleware
7. **Add coverage reporting** - pytest-cov, codecov integration

---

## 📋 Prioritized Action Plan

| Priority | Task | Effort | Impact |
|----------|------|--------|--------|
| P0 | Complete authentication | 2-3 days | High |
| P0 | Add backend tests | 3-4 days | High |
| P0 | Run DB migrations | 1 day | High |
| P1 | Consolidate geo utilities | 1 day | Medium |
| P1 | Standardize API versioning | 1-2 days | Medium |
| P1 | Frontend cleanup | 2 days | Medium |
| P1 | Error handling | 1-2 days | Medium |
| P2 | Search functionality | 3-4 days | Medium |
| P2 | Notification system | 3-4 days | Medium |
| P2 | Admin panel MVP | 4-5 days | Medium |
| P3 | Real-time expansion | 3-4 days | Low |
| P3 | Image pipeline | 2-3 days | Low |

---

## 📝 Conclusion

The Dharma codebase is well-structured with a modern tech stack suitable for a hyperlocal marketplace application. The main areas requiring immediate attention are:

1. **Security:** Complete authentication implementation
2. **Quality:** Add comprehensive test coverage
3. **Data:** Run pending database migrations

The foundation is solid, with good use of geospatial technologies (H3, PostGIS) and real-time capabilities (WebSocket, Celery). With the recommended improvements, the platform will be production-ready.

---

*Generated by Codebase Analysis Tool*
