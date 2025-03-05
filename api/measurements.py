import json


def get_measurements(front, side):
    # Load test body measurement from file
    with open('api/body_measurements.json', 'r') as f:
        body_measurements = json.load(f)

    return body_measurements

"""
body_measurements = get_measurements()

for (i, j) in body_measurements['upperBody'].items():
    print(f'{i.capitalize()}: {j["measurement"]} {j["unit"]}') if j['provided'] else print(f"{i.capitalize()}: {j['provided']}")"""