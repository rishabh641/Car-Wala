from flask import Flask,render_template,request,redirect
from flask_cors import CORS,cross_origin
from flask_sqlalchemy import SQLAlchemy
import pickle
import pandas as pd
import numpy as np

application=Flask(__name__)
cors=CORS(application)
model=pickle.load(open('LinearRegressionModel.pkl','rb'))
car=pd.read_csv('cars_modified.csv')

@application.route('/',methods=['GET','POST'])
def index():
    companies=sorted(car['company'].unique())
    car_models=sorted(car['name'].unique())
    year=sorted(car['year'].unique(),reverse=True)
    fuel_type=car['fuel_type'].unique()

    companies.insert(0,'Select Company')
    return render_template('index.html',companies=companies, car_models=car_models, years=year,fuel_types=fuel_type)

@application.route('/main')
def main():
    return render_template('main.html')

@application.route('/marketplace')
def marketplace():
    return render_template('marketplace.html')


@application.route('/predict',methods=['POST'])
@cross_origin()
def predict():

    company=request.form.get('company')

    car_model=request.form.get('car_models')
    year=request.form.get('year')
    year=int(year);
    fuel_type=request.form.get('fuel_type')
    driven=(request.form.get('kilo_driven'))
    driven=int(driven)
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



if __name__=='__main__':
    application.run(debug=True)
