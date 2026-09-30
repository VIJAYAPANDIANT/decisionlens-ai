import pandas as pd
from io import BytesIO
from fastapi import UploadFile
from ..utils.errors import raise_invalid_csv

async def load_csv(file: UploadFile) -> pd.DataFrame:
    if not file.filename.endswith('.csv'):
        raise_invalid_csv("Please upload a valid CSV file.")
        
    try:
        contents = await file.read()
        if not contents:
            raise_invalid_csv("The uploaded CSV is empty.")
            
        df = pd.read_csv(BytesIO(contents))
        
        if df.empty:
            raise_invalid_csv("The uploaded CSV contains no rows.")
            
        if len(df.columns) == 0:
            raise_invalid_csv("The uploaded CSV contains no columns.")
            
        return df
        
    except Exception as e:
        raise_invalid_csv(f"The uploaded CSV could not be analyzed. Reason: {str(e)}")
