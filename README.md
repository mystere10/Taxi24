[![Build Status](https://travis-ci.org/mystere10/Taxi24.svg?branch=master)](https://travis-ci.org/mystere10/Taxi24)

# Taxi 24 - We can help you manage your drivers fleet of your drivers and allocate to passengers.

## Vision

To revolutionize public transportation in Rwanda by providing access to our APIs to help you manage your taxi companies and hotels.

## API Spec

Here below are the stucture of the response for every endpoint

### Drivers

`GET /api/v1/drivers`

```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "phonenumber": "000 000 000 000",
            "available": "true",
            "location": "nyarugenge",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        },
        {
            "username": "mulisa",
            "email": "mulisa@example.com",
            "phonenumber": "000 000 000 000",
            "available": "true",
            "location": "nyarugenge",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        }
    ]
}
```
### Available Drivers
`GET /api/v1/drivers/available/`

```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "phonenumber": "000 000 000 000",
            "available": "true",
            "location": "nyarugenge",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        },
    ]
}
```

### Available drivers within a 3km for a specific location

`POST /api/v1/drivers/available/distance`

```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "phonenumber": "000 000 000 000",
            "available": "true",
            "location": "nyarugenge",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        },
        {
            "username": "John",
            "email": "john@example.com",
            "phonenumber": "000 000 000 000",
            "available": "true",
            "location": "nyarugenge",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        }
    ]
}
```

### Get a specific driver

`GET /api/v1/drivers/:id`

```source-json
{
    "driver":
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "location": "Nyarutarama",
            "distance": "3km",
            "trip request": "0",
            "pate number": "RAB 4343 BB"
        }
}
```

### Create a trip

`POST /api/v1/trip/new`

```source-json
{
	"driver":"Kalisa",
	"rider": "doe",
	"from": "kicukiro",
	"destination": "musanze",
	"trip_distance": "90km"
}
```

### Complete a trip

`PATCH /api/v1/trip/1/complete`

```source-json
{
    "trip":
        {
            "driver": "kalisa",
            "rider": "doe",
            "departure": "kicukiro",
            "destination": "musanze",
            "trip_distance": "90km",
            "trip_status": "complete"
        }
}
```

### List of all active trips

`GET /api/v1/trip/active`

```source-json
{
    "trips": 
        [
            {
                "driver": "kalisa",
                "rider": "doe",
                "departure": "kicukiro",
                "destination": "musanze",
                "trip_distance": "90km",
                "trip_status": "complete"
            }
        ]
}
```

### Riders

`GET /api/v1/riders`

```source-json
{
    "riders":[
        {
            "username": "doe",
            "email": "doe@example.com",
            "location": "kicukiro"
            "phonenumber": "000 000 000 000",
        }
    ]
}
```

### Get a specific rider by their ID

`GET /api/v1/riders/:id`

```source-json
{
    "rider":
        {
            "username": "doe",
            "email": "doe@example.com",
            "location": "kicukiro"
            "phonenumber": "000 000 000 000",
        }
}
```

### Activate a trip

`PATCH /api/v1/trip/1/5/activate`

```source-json
{
    "trip":
        {
            "driver": 5,
            "rider": 1,
            "departure": "kicukiro",
            "destination": "musanze",
            "trip_distance": "90km",
            "trip_status": "active"
        }
}
```

### Get at least three closest drivers for a specific driver

`GET /api/v1/drivers/1/closest`

```source-json
{
    "driver": [
        {
            "id": 1,
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "phonenumber": "0313232333",
            "available": true,
            "location": "kicukiro",
            "distance": "10km",
            "trip_requests": "0",
            "plate_number": "RAC 4435 BC"
        }
    ],
    "nearest": [
        {
            "id": 1,
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "phonenumber": "0313232333",
            "available": true,
            "location": "kicukiro",
            "distance": "10km",
            "trip_requests": "0",
            "plate_number": "RAC 4435 BC"
        },
        {
            "id": 2,
            "username": "Desire",
            "email": "desire@example.com",
            "phonenumber": "0313232456",
            "available": false,
            "location": "nyarugenge",
            "distance": "2km",
            "trip_requests": "0",
            "plate_number": "RA 4333 BB"
        },
        {
            "id": 3,
            "username": "Kamulisa",
            "email": "kamulisa@example.com",
            "phonenumber": "0313237674",
            "available": false,
            "location": "musanze",
            "distance": "2km",
            "trip_requests": "0",
            "plate_number": "RA 4133 BB"
        },
        {
            "id": 4,
            "username": "Manu",
            "email": "manu@example.com",
            "phonenumber": "0234232333",
            "available": true,
            "location": "kibuye",
            "distance": "2km",
            "trip_requests": "0",
            "plate_number": "RA 4334 BB"
        },
        {
            "id": 5,
            "username": "Kamanzi",
            "email": "kamanzi@example.com",
            "phonenumber": "02342632333",
            "available": true,
            "location": "kicukiro",
            "distance": "2km",
            "trip_requests": "0",
            "plate_number": "RA 4354 BB"
        },
        {
            "id": 6,
            "username": "kabalisa",
            "email": "kabalisa@example.com",
            "phonenumber": "02347732333",
            "available": true,
            "location": "kicukiro",
            "distance": "2km",
            "trip_requests": "0",
            "plate_number": "RA 4314 BB"
        }
    ]
}
```
