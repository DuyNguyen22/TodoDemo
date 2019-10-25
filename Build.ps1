cd "$PSScriptRoot/FrontEnd"
npm install --prefix FontEnd

cd "$PSScriptRoot/FrontEnd"
npm run build

Copy-Item "$PSScriptRoot/FrontEnd/dist/*" "$PSScriptRoot/BackEnd" -Force -Verbose

dotnet run --project "$PSScriptRoot/BackEnd/WebApi.csproj"