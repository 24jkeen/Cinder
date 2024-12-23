import os
import dotenv

def getConnectionUrl():
    config = dotenv.load_dotenv('.env.local')
    if not config:
        raise ValueError('Couldnt find config, probably need to create a .env.local')
        
    username = os.getenv('ATLAS_TEST_USERNAME')
    password = os.getenv('ATLAS_TEST_PASSWORD')
    connectionUrl = "mongodb+srv://{username}:{password}@cinder.aoxyp.mongodb.net/".format(username=username, password=password)
    return connectionUrl