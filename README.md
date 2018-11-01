# billing-project-api
RESTFul API for a basic billing project

# USAGE
- You can access to the online API here: https://billing-project-api.herokuapp.com/
- Every endpoint is a combination of the url + path + action
- You can check the types of the schemas in the models folder https://github.com/abimael67/billing-project-api/tree/master/models
### Paths:
- articles
- customers
- sellers
- bills
### Actions:
#### /get
 - GET verb.
- Retrieve all the data of the current path.
- Returns a json like this:

        {
               "count": number of records returned,
            "data": [
                {
                    "key1": "value1",
                    "key2: "value2",
                    "key3": "value3",
                }...
            ]
        }

#### /insert
 - POST verb.
- Insert data to the current path.
- Returns a json like this:

        {
            "key1": "value1",
            "key2: "value2",
            "key3": "value3",
        }
- Expect a JSON like this:

        {
            "key1": "value1",
            "key2: "value2",
            "key3": "value3",
        }

#### /toggle_status
 - POST verb.
- Toggles between active or inactive status.
- Returns a json like this:

        {
            "key1": "value1",
            "key2: "value2",
            "key3": "value3",
        }
- Expect a JSON like this:

        {
            "_id": "_id value"
        }    

#### /update
 - PUT verb.
- Update the path data with the provided data.
- Returns a json like this:

        {
            "key1": "value1",
            "key2: "value2",
            "key3": "value3",
        }
- Expect a JSON like this:

        {
            "_id": "_id value",
            "key1": "value1",
            "key2: "value2",
            "key3": "value3",
        }   
