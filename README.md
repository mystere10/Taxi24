[![Build Status](https://travis-ci.org/mystere10/Taxi24.svg?branch=master)](https://travis-ci.org/mystere10/Taxi24)
[![Coverage Status](https://coveralls.io/repos/github/mystere10/Taxi24/badge.svg?branch=master)](https://coveralls.io/github/mystere10/Taxi24?branch=master)

# Taxi 24 - We can help you manage your drivers fleet of your drivers and allocate to passengers.

## Vision

To revolutionize public transportation in Rwanda by providing access to our APIs to help you manage your taxi companies and hotels.

## API Spec

Here below are the stucture of the response for every endpoint

### Drivers
```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "distance": "10km",
            "trip request": "0",
            "pate number": "RAC 443 BC"
        },
        {
            "username": "Mulisa",
            "email": "mulisa@example.com",
            "contact": "000 000 000 000",
            "available": "false",
            "distance": "2km"
            "trip request": "0",
            "pate number": "RA 4333 BB"
        }
    ]
}
```
### Available Drivers
```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "location": "Nyarutarama",
            "distance": "2km",
            "trip request": "2",
            "pate number": "RAA 43 CC"
        },
        {
            "username": "Mulisa",
            "email": "mulisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "location": "Nyarutarama"
            "distance": "2km",
            "trip request": "3",
            "pate number": "RAD 433 BB"
        }
    ]
}
```

### Available drivers within a 3km for a specific location

```source-json
{
    "drivers":[
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "contact": "000 000 000 000",
            "Bio": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            "available": "true",
            "location": "Nyarutarama",
            "distance": "3km",
            "trip request": "0",
            "pate number": "RAD 4343 BB"
        },
        {
            "username": "Mulisa",
            "email": "mulisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "location": "Nyarutarama",
            "distance": "3km",
            "trip request": "0",
            "pate number": "RAC 4343 BB"
        }
    ]
}
```

### Get a specific driver

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

```source-json
{
    "trip":
        {
            "from": "Nyarutarama",
            "destination": "Kimironko",
            "driver": "kalisa",
            "trip distance": "30km",
            "trip status": "active"
        }
}
```

### Complete a trip

```source-json
{
    "trip":
        {
            "from": "Nyarutarama",
            "destination": "Nyarutarama",
            "driver": "kalisa",
            "trip distance": "30km",
            "trip status": "not active"
        }
}
```

### List of all active trips

```source-json
{
    "trips": 
        [
            {
                "from": "Nyarutarama",
                "destination": "Kimironko",
                "driver": "kalisa",
                "trip distance": "30km",
                "trip status": "active"
            },
            {
                "from": "Nyabugogo",
                "destination": "Musanze",
                "driver": "kalisa",
                "trip distance": "30km",
                "trip status": "active"
            }
        ]
}
```

### Riders
```source-json
{
    "riders":[
        {
            "username": "doe",
            "email": "doe@example.com",
            "contact": "000 000 000 000",
        },
        {
            "username": "Mugabo",
            "email": "mugabo@example.com",
            "contact": "000 000 000 000",
        }
    ]
}
```

### Get a specific rider by their ID

```source-json
{
    "driver":
        {
            "username": "doe",
            "email": "doe@example.com",
            "contact": "000 000 000 000",
        }
}
```

### Get at least three closest drivers for a specific driver

```source-json
{
    "driver":
        {
            "username": "Kalisa",
            "email": "kalisa@example.com",
            "contact": "000 000 000 000",
            "available": "true",
            "location": "Nyarutarama",
            "distance": "3km"
            "pate number": "RAA 4543 B",
            "trip request": "0"
            "closest ones": [
                {
                    "username": "Janvier",
                    "email": "kalisa@example.com",
                    "contact": "000 000 000 000",
                    "available": "true",
                    "location": "Nyarutarama",
                    "distance": "5km",
                    "pate number": "RAA 4343 BB",
                    "trip request": "0"
                },
                {
                    "username": "Abdoul",
                    "email": "kalisa@example.com",
                    "contact": "000 000 000 000",
                    "available": "true",
                    "location": "Nyarutarama",
                    "distance": "4km",
                    "pate number": "RAA 4443 BB",
                    "trip request": "0"
                }
            ]
        }
}
```