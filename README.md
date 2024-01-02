# dt162g_projekt
Repository för REST-webbtjänst till projektuppgift

Skapat av Erika Vestin, 2024 


Webbutvecklingsprogrammet, Miun Sundsvall 


Kurs: DT162G - JavaScriptbaserad Webbutveckling 

## Om REST-API:t
API:t är skapat med NodeJs och Express som ramverk (skapat med Express-generator). Data som hanteras i webbtjänsten lagras i en MongoDB-databas. Det finns tre Collections i API:t. Det som lagras är menyn (menu) för ett fiktivt café vid namn CoffeCake Café och användare (users) till caféets administrativa webbplats och login som endast används för POST-anrop vid inloggning av användare.

Webbtjänsten har full CRUD-funktionalitet för menyn. Det går att hämta hela meny, hämta specifika data från menyn med hjälp av id, lägga till en ny data på menyn, ändra en befintlig data i menyn och radera data. 

För användare finns endast funktionalitet för att hämta alla användare, hämta specifik användare md hjälp av id och att lägga till användare. För login finns endast funtionalitet för att logga in användare.


### Autentisering 

Collection Menu är skyddad och det krävs autentisering för att lägga till, ändra och radera data i den collection. Autentisering sker med hjälp av en token som skapas varje gång en användare loggar in i administrationsgränssnittet. Token returneras när en användare loggar in och lagras i applikationens localstorage. Den returneras även vid inloggning direkt via webbtjänsten. Token behöver skickas med i headers som Authorization. 

Collection users och login är öppna och skyddas inte av token.

POST, PUT & DELTET för Collection Menu är skyddad med autentisering som är skapad med hjälp av NPM-paketen jsonwebtoken, passport och passport-jwt. 

## NPM-paket

Förutom Node.js och Express har följande NPM-paket använts
- Morgan för att logga HTTP-requests (ingår i Express-generator)
- Debug för felsökning (ingår i Express-generator)
- Http-errors för att visa fel (ingår i Express-generator)
- Cookieparser (ingår i Express-generator)
- Cors för att tillåta cors
- Dotenv för att skapa en .env-fil
- Joi för validering av data
- Jsonwebtoken för att skapa token
- Mongoose för att skapa schema till MongoDB
- Nodemon för automatisk omstart vid ändring i källkodsfilerna
- Passport för autentisering
- Passport-jwt för autentisering
- Bcrypt för att Hasha lösenord

## Tillhörande webbapplikationer
Webbtjänsten (API:t) har två webbapplikationer som konusmerar data från webbtjänsten. Båda applikationerna är installerade med Vite och skapade med React som frontend-ramverk. All kod är skriven med TypeScript. Applikationerna är uppbyggda med flera olika komponenter.

En publik webbplats som är en presentationssida för caféet där de visar sin meny och information. Till den publika webbplatsen sker endast GET-anrop för menu endpointsen till API:t.

En administrativ webbplats där de som driver cafét kan se, lägga till, uppdatera och radera data. Till den administrativa webbplatsen sker, GET-, POST-, PUT- och DELETE-anrop för menu endpointsen till API:t. Dessutom sker GET- och POST-anrop för users-endpointsen för att kunna kontrollera inloggningsuppgifter för befintliga användare (GET) och skapa nya användare (POST). Dessutom finns en endpoint för login som enbart har POST-metod för inloggning av användare och retunering av token.

Kommunikation mellan API:t och applikationerna sker med hjälpa av Ajax-anrop med metoden Fetch. Data skickas till och från API:t i JSON-format och lagras i JSON-format.


## Endpoints och användning


### Menu


Metod           Ändpunkt                  Beskrivning


GET              /menu                    Hämtar alla poster i menyn


GET              /menu/id                 Hämtar en specifik post från menyn med hjälp av angivet ID. 


POST             /menu                    Lagrar ny data i menyn. Kräver att ett menu-objekt skickas med. Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.


PUT              /menu/id                 Uppdaterar en existerande post i menyn med angivet ID. Kräver att ett menu-objekt skickas med.  Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.


DELETE           /menu/id                 Raderar en post från menyn med hjälp av angivet ID. Token (fås vid inloggning av användare) behöver skickas med via Headers, Authorization.


### Users

Metod           Ändpunkt                  Beskrivning


GET              /users                   Hämtar alla användare


GET              /users/id                 Hämtar en specifik användare med hjälp av angivet ID. 


POST             /users                    Lagrar ny användare. Kräver att ett users-objekt skickas med. 


### Login

Metod           Ändpunkt                  Beskrivning

POST             /login                    Loggar in användare. Kräver att ett users-objekt skickas med. 


## Format på objekt 

### Menu

{

    "_id": "65900ddf931ba946be6a2744",
    
    "name": "Kanelbulle",
    
    "description": "Vetebulle med kanel, socker, kardemumma, pärlsocker",
    
    "category": "Frukost",
    
    "price": "25kr",
    
    "__v": 0
    
  }


  ### Users

  {
  
    "_id": "659034262fac72c1254072f0",
    
    "email": "e@outlook.com",
    
    "password": "$2b$10$/EJUOvZoj8KbhhlX9SH9uemgxf5HtrSj30Xghh4Zi8TqZ0tRzJpWW",
    
    "name": "Erika Vestin",
    
    "__v": 0
    
  }


### Login

{

    "email": "mateo@outlook.com",
    
    "password" : "password"
    
}



### Login - Format på Token dom returneras när inloggning lyckas för en användare


{

  "message": "Välkommen",
  
  "token":
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTAzNmNkNDRiYzdkZjhiODMzZDNlOSIsImlhdCI6MTcwNDIwMzQzM30._figTzpc4OPHvf6v9u44F_BLjDitIEjoNJZ82IuF1qE"
  
}
