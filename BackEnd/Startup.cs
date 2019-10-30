using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;
using WebApi.Services;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            var appSettings = appSettingsSection.Get<AppSettings>();

            services.AddCors();
            services.AddDbContext<DataContext>(x => 
            {
                //x.UseInMemoryDatabase("TestDb");
                //x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
                if (appSettings.UseInMemoryDatabase)
                    x.UseInMemoryDatabase("TodoDb");
                else
                    x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = int.Parse(context.Principal.Identity.Name);
                        var user = userService.GetById(userId);
                        if (user == null)
                        {
                            // return unauthorized if user no longer exists
                            context.Fail("Unauthorized");
                        }
                        return Task.CompletedTask;
                    }
                };
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // configure DI for application services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ITodoService, TodoService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddSingleton<AppSettings>(appSettings);
            services.AddMvc(option => 
            {
                option.EnableEndpointRouting = false;
            });
            //MvcOptions.EnableEndpointRouting = false
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            //app.UseFileServer();
            // app.UseDefaultFiles();
            // app.UseStaticFiles();
            // app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(env.ContentRootPath),
            //     //RequestPath = "/"
            });

            app.UseDefaultFiles(new DefaultFilesOptions { DefaultFileNames = new List<string> { "index.html" } });

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}");

                routes.MapRoute(
                    name: "any",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        private static void SeedData(DataContext context)
        {
            context.Users.AddRange(DataContextSeeder.CreateSeedUser());
            context.Categories.AddRange(DataContextSeeder.CreateSeedCategory());
            context.Todos.AddRange(DataContextSeeder.CreateSeedTodo());
            context.SaveChanges();
        }
    }
}
