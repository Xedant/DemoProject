var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5001");

var app = builder.Build();

app.MapGet("/api/hello", () =>
{
    return Results.Json(new
    {
        message = "Hello World",
        server = "ASP.NET Core 9.0",
        timestamp = DateTime.UtcNow.ToString("o")
    });
});

app.MapGet("/", () => "ASP.NET Core Server running. Visit /api/hello for the API.");

app.Run();
