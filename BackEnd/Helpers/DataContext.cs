using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<TodoTag>()
            //     .HasKey(e => new { e.TodoId, e.TagId });
            modelBuilder.Entity<User>(entity =>
            {
                byte[] passwordSalt, passwordHash;
                using (var hmac = new System.Security.Cryptography.HMACSHA512())
                {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("123"));
                }
                entity.HasKey(x => x.Id);
                entity.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(x => x.LastName).HasMaxLength(100).IsRequired();
                entity.Property(x => x.Username).HasMaxLength(50).IsRequired();
                entity.Property(x => x.Birthdate).IsRequired();
                entity.HasMany(x => x.Todos)
                    .WithOne(x => x.User)
                    .HasForeignKey(x => x.CreatedBy)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasData(
                    new User
                    {
                        Id = 1,
                        FirstName = "Admin",
                        LastName = "System",
                        Username = "Admin",
                        PasswordSalt = passwordSalt,
                        PasswordHash = passwordHash,
                        IsAdmin = true,
                        IsBlocked = false,
                        Birthdate = new DateTime(1980, 1, 1)
                    }
                );
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                var todos = Enumerable.Range(1, 20)
                    .Select(i => new Todo 
                                {
                                    Id = i,
                                    Title = $"Title-{i}",
                                    Description = $"Desciption-{i}",
                                    CreatedDate = DateTime.Now,
                                    CreatedBy = 1,
                                    IsCompleted = false,
                                })
                    .ToArray();
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Title).HasMaxLength(255).IsRequired();
                entity.Property(x => x.Description).HasMaxLength(1000);
                entity.HasOne(x => x.Category);
                entity.HasData(todos);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Title).HasMaxLength(100).IsRequired();
                entity.Property(x => x.Description).HasMaxLength(255);
                entity.HasData(
                    new Category { Id = 1, Title = "National", Description = "National information" },
                    new Category { Id = 2, Title = "Fashion", Description = "Fashion information" },
                    new Category { Id = 3, Title = "Learning", Description = "Learning information" },
                    new Category { Id = 4, Title = "Hobby", Description = "Hobby information" }
                );
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
                entity.HasData(
                    new Tag { Id = 1, Name = "National" },
                    new Tag { Id = 2, Name = "Fashion" },
                    new Tag { Id = 3, Name = "Learning" },
                    new Tag { Id = 4, Name = "Hobby" }
                );
            });

            modelBuilder.Entity<TodoTag>(entity =>
            {
                entity.HasKey(x => new { x.TodoId, x.TagId });
                entity.HasOne(x => x.Todo)
                    .WithMany(x => x.TodoTags)
                    .HasForeignKey(x => x.TodoId);
                entity.HasOne(x => x.Tag)
                    .WithMany(x => x.TodoTags)
                    .HasForeignKey(x => x.TagId);
            });
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TodoTag> TodoTags { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}