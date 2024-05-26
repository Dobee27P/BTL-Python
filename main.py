from flask import Flask
import requests

app = Flask(__name__)

@app.route('/teams', methods=['GET'])
def get_teams():
    url = "https://api.balldontlie.io/v1/teams"
    headers = {
        "Authorization": "c065d639-c739-407c-bf83-bd8733ba4795"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        teams = response.json()
        return {'teams':teams}
    else:
        return {"error": f"Failed to retrieve data: {response.status_code}"}, response.status_code

if __name__ == '__main__':
    app.run(debug=True)
