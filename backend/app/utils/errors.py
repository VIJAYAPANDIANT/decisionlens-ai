from fastapi import HTTPException

def raise_invalid_csv(message: str):
    raise HTTPException(status_code=400, detail={
        "code": "INVALID_CSV",
        "message": message
    })
