using Microsoft.EntityFrameworkCore;
using EFCoreLearning.Model;


namespace EFCoreLearning.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Product> products { get; set; }



    }
}
