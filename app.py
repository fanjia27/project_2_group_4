import os

import pandas as pd
import numpy as np
import sqlalchemy
import pymysql
import json

from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from flask import url_for
from flask import render_template

from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import sessionmaker


pymysql.install_as_MySQLdb()

app = Flask(__name__, static_folder='public', static_url_path='')

#################################################
# Database Setup
#################################################

# Database Connection
#username = 'root'
#password = 'ming1119'
#host = 'localhost'
#port = '3306'
#database = 'cloudresources'

#engine = create_engine("mysql://{username}:{password}@{host}:{port}/{database}")

engine = create_engine("mysql://root:ming1119@localhost:3306/cloudresources")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# Create our session (link) from Python to the DB
Session = sessionmaker(bind=engine)

# Save references to db table
Cloudresources_data = Base.classes.cloud_resource_data


#################################################
# Route Setup
#################################################

#Return the homepage
@app.route("/")
def index():
    return render_template("index.html")

#Return all data from cloudresources db
@app.route("/api/data")
def data():

    #open session
    session = Session()
    #query the data
    cloud_results = session.query(Cloudresources_data).all()
    #close session
    session.close()

    #create empty list
    all_data = []

    #loop through the result and store each record
    for data in cloud_results:
        #starting dictionary
        data_dict = {}
        #each element
        data_dict['app'] = data.app_name
        data_dict['cpu'] = float(data.cpu)
        data_dict['memory'] = float(data.memory)
        data_dict['network'] = float(data.network)
        data_dict['disk'] = float(data.disk)
        data_dict['average'] = float(data.average)
        data_dict['server'] = str(data.server_id)
        data_dict['server_cost'] = float(data.server_cost)
        #append into dictionary
        all_data.append(data_dict)
    
    #return with json format data for api
    return jsonify(all_data)

#Return data summary group by app
@app.route("/api/data_summary")
def data_summary():

    #open session
    session = Session()
    #query the data
    #cloud_results = session.query(Cloudresources_data).all()
    cloud_results = session.query(Cloudresources_data.id, Cloudresources_data.cpu, Cloudresources_data.memory, 
                                Cloudresources_data.network,Cloudresources_data.disk, Cloudresources_data.average,
                                  Cloudresources_data.app_name,Cloudresources_data.server_id,Cloudresources_data.server_cost).\
    order_by(Cloudresources_data.id.asc()).all()
    #close session
    session.close()

    #create dataframe from query result
    cloud_df = pd.DataFrame(cloud_results, columns=['id', 'cpu', 'memory','network','disk','average','app_name','server_id','server_cost'])

    #convertion from string to numeric for calculation
    cloud_df['cpu'] = pd.to_numeric(cloud_df['cpu'])
    cloud_df['memory'] = pd.to_numeric(cloud_df['memory'])
    cloud_df['network'] = pd.to_numeric(cloud_df['network'])
    cloud_df['disk'] = pd.to_numeric(cloud_df['disk'])
    cloud_df['average'] = pd.to_numeric(cloud_df['average'])
    cloud_df['server_cost'] = pd.to_numeric(cloud_df['server_cost'])

    #calculate mean and total
    mean_cpu = cloud_df.groupby('app_name')['cpu'].mean()
    mean_memory = cloud_df.groupby('app_name')['memory'].mean()
    mean_network = cloud_df.groupby('app_name')['network'].mean()
    mean_disk = cloud_df.groupby('app_name')['disk'].mean()
    total_server = cloud_df.groupby('app_name')['server_id'].count()
    total_server_cost = cloud_df.groupby('app_name')['disk'].sum()

    #store mean and total into dataframe
    summary_cloud_df = pd.DataFrame({'avg_cpu': mean_cpu,'avg_memory': mean_memory,'avg_network': mean_network,'avg_disk': mean_disk,
                                 'total_server': total_server,'total_server_cost': total_server_cost})
    #reset index
    summary_cloud_df = summary_cloud_df.reset_index()

    #jsonify dataframe
    summary_data_json = json.loads(summary_cloud_df.to_json(orient='records'))

    #return with json format data for api
    return jsonify(summary_data_json)


#Return data by selected app
@app.route("/api/data/apps/<app>")
def app_data(app=None):
    #sample app route: /api/data/apps/Encryption
    session = Session()
    #app_results = session.query(Cloudresources_data).all()
    app_results = session.query(Cloudresources_data.id, Cloudresources_data.cpu, Cloudresources_data.memory, 
                                Cloudresources_data.network,Cloudresources_data.disk, Cloudresources_data.average,
                                  Cloudresources_data.app_name,Cloudresources_data.server_id,Cloudresources_data.server_cost).\
    order_by(Cloudresources_data.id.asc()).all()
    session.close()

   #create dataframe from query result
    app_df = pd.DataFrame(app_results, columns=['id', 'cpu', 'memory','network','disk','average','app_name','server_id','server_cost'])

    #convertion from string to numeric for calculation
    app_df['cpu'] = pd.to_numeric(app_df['cpu'])
    app_df['memory'] = pd.to_numeric(app_df['memory'])
    app_df['network'] = pd.to_numeric(app_df['network'])
    app_df['disk'] = pd.to_numeric(app_df['disk'])
    app_df['average'] = pd.to_numeric(app_df['average'])
    app_df['server_cost'] = pd.to_numeric(app_df['server_cost'])


    app_filtered_df = app_df[app_df['app_name'] == app]

    json_app_data = json.loads(app_filtered_df.to_json(orient='records'))
    #return json format for api route
    return jsonify(json_app_data)


#Return summary by selected app
@app.route("/api/data/apps_summary/<app>")
def app_summary(app=None):
    #sample app route: /api/data/apps_summary/Encryption
    session = Session()
    #app_results = session.query(Cloudresources_data).all()
    app_results= session.query(Cloudresources_data.id, Cloudresources_data.cpu, Cloudresources_data.memory, 
                                Cloudresources_data.network,Cloudresources_data.disk, Cloudresources_data.average,
                                  Cloudresources_data.app_name,Cloudresources_data.server_id,Cloudresources_data.server_cost).\
    order_by(Cloudresources_data.id.asc()).all()
    session.close()

   #create dataframe from query result
    app_df = pd.DataFrame(app_results, columns=['id', 'cpu', 'memory','network','disk','average','app_name','server_id','server_cost'])

    #convertion from string to numeric for calculation
    app_df['cpu'] = pd.to_numeric(app_df['cpu'])
    app_df['memory'] = pd.to_numeric(app_df['memory'])
    app_df['network'] = pd.to_numeric(app_df['network'])
    app_df['disk'] = pd.to_numeric(app_df['disk'])
    app_df['average'] = pd.to_numeric(app_df['average'])
    app_df['server_cost'] = pd.to_numeric(app_df['server_cost'])


    app_filtered_df = app_df[app_df['app_name'] == app]


    #total number of server per app
    total_server_per_app = app_filtered_df.groupby('app_name')['server_id'].count()

    #average cpu, memory, network and disk
    avg_cpu_per_app = app_filtered_df.groupby('app_name')['cpu'].mean()
    avg_memory_per_app = app_filtered_df.groupby('app_name')['memory'].mean()
    avg_network_per_app = app_filtered_df.groupby('app_name')['network'].mean()
    avg_disk_per_app = app_filtered_df.groupby('app_name')['disk'].mean()

    under_performing_df = app_filtered_df[(app_filtered_df['cpu'] <= 0.30) & (app_filtered_df['memory'] <= 0.30) 
                                & (app_filtered_df['network'] <= 0.30) & (app_filtered_df['disk'] <= 0.30) ]

    exceed_performing_df = app_filtered_df[(app_filtered_df['cpu'] >= 0.95) & (app_filtered_df['memory'] >= 0.95) 
                                & (app_filtered_df['network'] >= 0.95) & (app_filtered_df['disk'] >= 0.95) ]

    average_performing_df = app_filtered_df[((app_filtered_df['cpu'] > 0.30) | (app_filtered_df['memory'] > 0.30)
                                            | (app_filtered_df['network'] > 0.30) | (app_filtered_df['disk'] > 0.30))
                                            & ((app_filtered_df['cpu'] < 0.95) | (app_filtered_df['memory'] < 0.95)
                                                | (app_filtered_df['network'] < 0.95) | (app_filtered_df['disk'] < 0.95))
                                        ]

    #total number of server per performing ranking
    under_performing_server_count = under_performing_df.groupby('app_name')['server_id'].count()
    exceed_performing_server_count = exceed_performing_df.groupby('app_name')['server_id'].count()
    average_performing_server_count = average_performing_df.groupby('app_name')['server_id'].count()

    #store the stastics into dataframe
    summary_app_df = pd.DataFrame({'total_server': total_server_per_app,
                               'nbr_of_under_performing':under_performing_server_count,
                               'nbr_of_exceed_performing':exceed_performing_server_count,
                               'nbr_of_average_performing':average_performing_server_count,
                               'avg_cpu':avg_cpu_per_app,'avg_memory':avg_memory_per_app,
                               'avg_network':avg_network_per_app,'avg_disk':avg_disk_per_app
                              })
    #reset index
    summary_app_df = summary_app_df.reset_index()
    #jsonify dataframe
    json_app = json.loads(summary_app_df.to_json(orient='records'))
    #return json format for api route
    return jsonify(json_app)


#################################################
# End of Route setup
#################################################

if __name__ == "__main__":
    app.run(debug=True)

