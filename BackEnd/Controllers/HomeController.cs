using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

public class HomeController : Controller
{
    private readonly IWebHostEnvironment _env;
    private readonly IMemoryCache _memoryCache;

    public HomeController(IWebHostEnvironment env, IMemoryCache memoryCache)
    {
        this._env = env;
        this._memoryCache = memoryCache;
    }

    public IActionResult Index()
    {
        //var content = await System.IO.File.ReadAllTextAsync(System.IO.Path.Combine(_env.ContentRootPath, "index.html"));
        //_memoryCache.Set()
        return this.PhysicalFile(System.IO.Path.Combine(_env.ContentRootPath, "index.html"), "text/html; charset=utf-8");
        //return View();
    }
}