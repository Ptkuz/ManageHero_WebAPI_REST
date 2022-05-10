using Microsoft.EntityFrameworkCore;
using ManageHero_ASP.NET_EF.DataBase;
using ManageHero_ASP.NET_EF.DataBase.Entity;

var builder = WebApplication.CreateBuilder(args);
string connection = builder.Configuration.GetConnectionString("DbConnect");
builder.Services.AddDbContext<ApplicationContext>(options=>options.UseSqlServer(connection));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


// Получаем всех пользователей
app.MapGet("/api/heroes", async (ApplicationContext db) => await db.Heroes.ToListAsync());


// Получаем пользователя по ID
app.MapGet("/api/heroes/{id:int}", async (int id, ApplicationContext db) => 
{
    Hero? hero = await db.Heroes.FirstOrDefaultAsync(u=>u.Id==id);

    if (hero == null)
        return Results.NotFound(new { message = "Пользователь не найден"});

    return Results.Json(hero);

});

// Удаляем пользователя по ID
app.MapDelete("/api/heroes/{id:int}", async (int id, ApplicationContext db) => 
{
    Hero? hero = await db.Heroes.FirstOrDefaultAsync(u=>u.Id==id);

    if (hero == null)
        return Results.NotFound(new {message = "Пользователь не найден"});

    db.Heroes.Remove(hero);
    await db.SaveChangesAsync();
    return Results.Json(hero);

});

// Добавляем пользователя 
app.MapPost("/api/heroes", async (Hero hero, ApplicationContext db) => 
{
    await db.Heroes.AddAsync(hero);
    await db.SaveChangesAsync();
    return hero;

} );

// Изменяем пользователя
app.MapPut("/api/heroes", async (Hero heroData, ApplicationContext db) => 
{ 
    var hero = await db.Heroes.FirstOrDefaultAsync(u => u.Id==heroData.Id);
    if (hero == null)
        return Results.NotFound(new {message = "Пользователь не найден"});

    hero.Alias = heroData.Alias;
    hero.Name = heroData.Name;
    hero.PublishHouse = heroData.PublishHouse;

    await db.SaveChangesAsync();
    return Results.Json(hero);
});


app.Run();
