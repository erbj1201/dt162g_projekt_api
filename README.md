# dt162g_projekt
Repository för REST-webbtjänst till projektuppgift

Skapat av Erika Vestin, 2024 


Webbutvecklingsprogrammet, Miun Sundsvall 


Kurs: DT162G - JavaScriptbaserad Webbutveckling 

## Om REST-API:t
API:t är skapat med NodeJs och Express som ramverk. Data som hanteras i webbtjänsten lagras i en MongoDB-databas. Det som lagras är menyn (menu) för ett fiktivt café vid namn CoffeCake Café och användare (users) till caféets administrativa webbplats.

Webbtjänsten har full CRUD-funktionalitet för menyn. Det går att hämta hela meny, hämta specifika data från menyn med hjälp av id, lägga till en ny data på menyn, ändra en befintlig data i menyn och radera data. 

För användare finns endast funktionalitet för att hämta alla användare, hämta specifik användare md hjälp av id och att lägga till användare.

## Tillhörande webbapplikationer
Webbtjänsten (API:t) har två webbapplikationer som konusmerar data från webbtjänsten. 

En publik webbplats som är en presentationssida för caféet där de visar sin meny och information.

En administrativ webbplats där de som driver cafét kan se, lägga till, uppdatera och radera data. 

Kommunikation mellan API:t och applikationerna sker med hjälpa av Ajax-anrop med metoden Fetch. Data skickas till och från API:t i JSON-format och lagras i JSON-format.


## Endpoints och användning


Metod           Ändpunkt                  Beskrivning


GET              /menu                    Hämtar alla poster i menyn


GET              /menu/id                 Hämtar en specifik post från menyn med hjälp av angivet ID. 


POST             /menu                    Lagrar ny data i menyn. Kräver att ett menu-objekt skickas med. 


PUT              /menu/id                 Uppdaterar en existerande post i menyn med angivet ID. Kräver att ett menu-objekt skickas med. 


DELETE           /menu/id                 Raderar en post från menyn med hjälp av angivet ID.


### Format på menu-objekt 

{


    "_id": "65900ddf931ba946be6a2744",

    "name": "Kanelbulle",
    
    "description": "Vetebulle med kanel, socker, kardemumma, pärlsocker",

    "category": "Frukost",

    "price": "25kr",
    
    "__v": 0

    
  }
