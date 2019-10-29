using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Helpers;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            //2. Find the service layer within our scope.
            using (var scope = host.Services.CreateScope())
            {
                //3. Get the instance of BoardGamesDBContext in our services layer
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<DataContext>();
                var appSettings = services.GetRequiredService<AppSettings>();

                //4. Call the DataGenerator to create sample data
                if (appSettings.UseInMemoryDatabase)
                    SeedData(context);
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                        .UseUrls("http://localhost:4000");
                });

        private static void SeedData(DataContext context)
        {
            context.Users.AddRange(DataContextSeeder.CreateSeedUser());
            context.Categories.AddRange(DataContextSeeder.CreateSeedCategory());
            context.Todos.AddRange(DataContextSeeder.CreateSeedTodo());
            context.TodoTags.AddRange(DataContextSeeder.CreateSeedTodoTag());
            context.SaveChanges();
        }
    }
}
