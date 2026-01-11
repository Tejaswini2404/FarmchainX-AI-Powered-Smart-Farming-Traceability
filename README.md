AI-Driven Agricultural Traceability & Farm-Direct Commerce Platform

FarmChainX is a full-stack, role-based agricultural traceability and commerce platform designed to bring trust, transparency, and efficiency to the farm-to-table supply chain.

The platform enables farm-direct purchasing, QR-based traceability, and secure role-based operations for farmers, distributors, retailers, and end consumers.
 Key Features
 Secure Authentication
 Multi-role dashboards (Admin, Farmer, Distributor, Retailer, Customer)
 Farm-direct product marketplace
 QR-based traceability (farm → batch → harvest → quality)
 AI quality analysis (extensible)
 Operational dashboards with KPIs
 Mobile-first, responsive UI
 Scalable architecture (enterprise-ready)

JWT-based authentication
Role-based access control (RBAC)
Encrypted passwords (BCrypt)

 Multi-Role Dashboards:
Customer
Farmer
Distributor
Retailer
Admin

Each role has a dedicated dashboard designed for its real-world responsibilities.

 Farm-Direct Marketplace:
Browse agricultural products
Category-based listings (grains, vegetables, fruits, pulses)
Organic / farm-direct / discount indicators
Cart & checkout flow
One-click reorder

 QR-Based Traceability (Core Feature)

Scan product QR codes
View:
Farmer name
Farm location
Harvest date
Batch ID
Quality / trust score

Designed to scale toward blockchain-backed traceability

Operational Dashboards:
Order tracking with status badges
Inventory visibility
Logistics & dispatch readiness
KPI cards for quick insights

 Enterprise-Grade UI/UX:
Mobile-first responsive design
Farming-inspired visual theme
Glass-morphism cards
Clear empty states & skeleton loaders
WCAG-friendly contrast and accessibility

User Roles & Responsibilities
Customer:
Browse farm-direct products
Manage cart & orders
View order history
Reorder with one click
Scan QR codes for product traceability

 Farmer:
Add & manage products
Upload batch and harvest data
Enable traceability at source
Monitor sales

 Distributor:
Manage retailer orders
Update order status (Pending → Processing → Shipped → Fulfilled)
Track inventory & logistics
View operational analytics

 Retailer:
Place bulk orders
Track shipments
Manage stock

Admin:
Manage users & roles
Monitor platform health
System-level oversight

 Security & Trust:
JWT-secured APIs
Role-based route protection
Secure session handling
Trust indicators in UI:
“ Secure access via FarmChainX”
No sensitive data exposed on frontend

🛠️ Tech Stack
Frontend:
React
React Router
Axios / Fetch API
Custom CSS (responsive & accessible)
JWT handling via localStorage

Backend:
Java
Spring Boot
Spring Security
JWT
RESTful APIs
Database
PostgreSQL

Tools
Git & GitHub
Postman (API testing)
VS Code / Spring Tool Suite

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/FarmChainX.git
cd FarmChainX

2️⃣ Frontend
cd frontend
npm install
npm start

3️⃣ Backend
cd backend
mvn spring-boot:run

4️⃣ Access Application
Frontend: http://localhost:3000
Backend:  http://localhost:8080

 Current Project Status

 Authentication & role-based routing
 Customer dashboard (production-grade UI)
 Distributor dashboard (operations-focused)
 Product marketplace (mock data → API-ready)
 QR traceability UI (scanner-ready)
 Backend API integration (in progress)
 AI quality analysis (future scope)

 Future Enhancements:
Real QR camera scanning
Blockchain-backed traceability
AI-powered crop quality & yield analysis
Real-time logistics tracking
Mobile app version


FarmChainX ensures:
Transparency over opacity
Accountability over assumptions
Trust over marketing claims
