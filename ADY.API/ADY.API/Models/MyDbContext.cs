using Microsoft.EntityFrameworkCore;

namespace ADY.API.Models
{
    public class MyDbContext : DbContext
    {   
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {
          
        }
        public DbSet<User> Users { get; set; }
    }
}
