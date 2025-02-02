using Microsoft.EntityFrameworkCore;

namespace ADY.API.Models
{
	public class MyDbContext : DbContext
	{
		
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(
				"Data Source=sql.bsite.net\\MSSQL2016;" +
				"User ID=ali2007th15_ADY;" +
				"Password=Ali2007th;" +
				"Connect Timeout=30;" +
				"Encrypt=True;" +
				"Trust Server Certificate=True;" +
				"Application Intent=ReadWrite;" +
				"Multi Subnet Failover=False");
		}

		
		public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

		
		public DbSet<User> Users { get; set; }

		
		public DbSet<Ticket> Tickets { get; set; }

	
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			
			modelBuilder.Entity<Ticket>()
				.HasOne<User>() 
				.WithMany()     
				.HasForeignKey(t => t.UserId) 
				.OnDelete(DeleteBehavior.Cascade);

	
		}
	}
}
