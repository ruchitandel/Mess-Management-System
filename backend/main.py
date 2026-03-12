from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from database import engine, Base

# Import models (important for table creation)
from models import user, role, student, meal, attendance, billing, inventory

# Routers
from routes import (
    user,
    auth,
    meal,
    attendance,
    billing,
    students,
    wastage,
    dashboard,
    inventory,
    student_dashboard,
    student_attendance,
    student_billing,
    staff_dashboard,
    staff_attendance,
    staff_billing,
    staff_meals,
    staff_announcements
)

app = FastAPI(
    title="Mess Management System API",
    description="Backend API for Mess Management System",
    version="1.0.0"
)

# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= DATABASE =================

Base.metadata.create_all(bind=engine)

# ================= ROUTERS =================

app.include_router(user.router)
app.include_router(auth.router)

app.include_router(students.router)

app.include_router(meal.router)
app.include_router(attendance.router)
app.include_router(billing.router)

app.include_router(inventory.router)
app.include_router(wastage.router)

app.include_router(dashboard.router)

# STUDENT ROUTES
app.include_router(student_dashboard.router)
app.include_router(student_attendance.router)
app.include_router(student_billing.router)

# STAFF ROUTES
app.include_router(staff_dashboard.router)
app.include_router(staff_attendance.router)
app.include_router(staff_billing.router)
app.include_router(staff_meals.router)
app.include_router(staff_announcements.router)

# ================= ROOT =================

@app.get("/")
def root():
    return {"message": "Mess Management System Backend Running 🚀"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}