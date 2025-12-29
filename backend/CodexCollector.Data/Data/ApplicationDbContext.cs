using CodexCollector.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CodexCollector.Data.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Resource> Resources { get; set; }
    }
}