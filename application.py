import pickle
import pandas as pd
import numpy as np
import sys

model=pickle.load(open('LinearRegressionModel.pkl','rb'))
car=pd.read_csv('cars_modified.csv')
def predict():
    company=sys.argv[1];
    car_model=sys.argv[2];
    year=int(sys.argv[3]);
    fuel_type=sys.argv[4];
    driven=int(sys.argv[5]);
    if driven < 500:
        return "Car is Not used"
    if driven >=200000:
        return str("Rs. 0")
    driven=-1*int(driven)
    driven=str(driven)

    prediction=model.predict(pd.DataFrame(columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'],
                              data=np.array([car_model,company,year,driven,fuel_type]).reshape(1, 5)))

    prediction[0]=prediction[0]+int(driven)
    if prediction[0] < 0:
        prediction[0]=-1*prediction[0]
    return "Rs. "+str(np.round(prediction[0],2))

print(predict());