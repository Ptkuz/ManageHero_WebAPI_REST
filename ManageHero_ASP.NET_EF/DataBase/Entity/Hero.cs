namespace ManageHero_ASP.NET_EF.DataBase.Entity
{
    public class Hero
    {
        public int Id { get; set; }
        public string Alias { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string PublishHouse { get; set; } = null!;

    }
}
