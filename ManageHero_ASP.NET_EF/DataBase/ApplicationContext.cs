using Microsoft.EntityFrameworkCore;
using ManageHero_ASP.NET_EF.DataBase.Entity;

namespace ManageHero_ASP.NET_EF.DataBase
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; } = null!;
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) =>
            Database.EnsureCreated();

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<Hero>().HasData(
                new Hero() { Id = 1, Alias = "Бэтмен", Name = "Брюс Уэйн", PublishHouse = "DC"},
                new Hero() { Id = 2, Alias ="Человек-паук", Name="Питер Паркер", PublishHouse="Marvel"},
                new Hero() { Id = 3, Alias ="Железный человек", Name="Тони Старк", PublishHouse="Marvel"}
                );
        }
        
    }
}
