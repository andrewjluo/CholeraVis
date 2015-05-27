import csv
from random import *
import time
from datetime import *
from faker import Faker

def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

if __name__ == "__main__":
  fake = Faker()
  field_names = ['id', 'created_by', 'created_date', 'modified_by', 'modified_date', 'name', \
                'patient_id', 'phone', 'encounter_time', 'age_month', 'age_year', 'age_DOB', \
                'weight_given', 'weight', 'dehydration_status', 'dehydration_status_plan',   \
                'gender', 'residence_position', 'recorded_position', 'location_address',     \
                'dehydration_status_given', 'method', 'discharged',  'danger_sign_present',  \
                'server_time', 'nameNone', 'phoneNone', 'patientidNone', 
                'residence_location_text', 'recorded_location_text',  'location_accuracy',   \
                'residence_location_none']


  with open('fake_db.csv', 'wb') as f:
    writer = csv.DictWriter(f, fieldnames=field_names)
    writer.writeheader()

    data = {}
    for row in range(1, 22000):
      data['id'] = row
      data['encounter_time'] = fake.date_time_between(start_date="-3y", end_date="now").strftime("%m/%d/%Y")
      data['created_by'] = 'data_generator'
      data['created_date'] = data['encounter_time']
      data['modified_by'] = 'data_generator'
      data['modified_date'] = date.today()
      data['name'] = fake.name()
      data['patient_id'] = ''
      data['phone'] = ''
      data['age_year'] = randint(0, 100)
      data['age_month'] = randint(0, 11) if data['age_year'] != 0 else randint(1, 11)
      data['age_DOB'] = ''
      data['weight_given'] = 0
      data['weight'] = randint(5, 400)
      data['dehydration_status'] = randint(1, 3)
      data['dehydration_status_plan'] = randint(1, 3)
      data['gender'] = randint(0, 1)
      data['residence_position'] = str(uniform(22.80, 25.50)) + ',' + str(uniform(89.13, 91.115))
      data['recorded_position'] = '23.763356,90.370574'
      data['location_address'] = ''
      data['dehydration_status_given'] = 0
      data['method'] = randint(0, 2)
      data['discharged'] = False
      data['danger_sign_present'] = False
      data['server_time'] = date.today()
      data['nameNone'] = False
      data['phoneNone'] = False
      data['patientidNone'] = False
      data['residence_location_text'] = ''
      data['recorded_location_text'] = ''
      data['location_accuracy'] = ''
      data['residence_location_none'] = False

      writer.writerow(data)