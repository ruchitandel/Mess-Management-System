from pydantic import BaseModel
from datetime import date

class BillingCreate(BaseModel):
    month: date


class BillingResponse(BaseModel):
    id: int
    student_id: int
    total_meals: int
    bill_amount: float
    payment_status: str
    payment_mode: str | None
    month: date

    class Config:
        from_attributes = True
