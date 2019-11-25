# TodoDemo
Todo app (.net core 3, react)

Prerequisite
- NetCore3.0 Sdk
  https://dotnet.microsoft.com/download/dotnet-core/3.0
- Nodejs
- EntittyFrameworkCore command line
  dotnet tool install --global dotnet-ef
  
  Configuration
  - Support 2 mode database options:
    + In memory database (default): in BackEnd\appsettings.json set option "UseInMemoryDatabase" to true
    "AppSettings": {
      "Secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
      "UseInMemoryDatabase": false
    },
    + Sql Server: In BackEnd\appsettings.json set option "UseInMemoryDatabase" to false and config the "DefaultConnection"
    "ConnectionStrings": {
      "DefaultConnection": "server=.;database=TestTodo;user id=[your username];password=[your password]"
    },
    "AppSettings": {
      "Secret": "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
      "UseInMemoryDatabase": false
    },
    
 - Start the website:
  1) Run Build.ps1 in the root folder to build the website
  2) Run Start-Website.ps1 to start the todo web
