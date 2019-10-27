using System;
using System.Collections.Generic;
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
                entity.HasKey(x => x.Id);
                entity.Property(x => x.FirstName).HasMaxLength(100).IsRequired();
                entity.Property(x => x.LastName).HasMaxLength(100).IsRequired();
                entity.Property(x => x.Username).HasMaxLength(50).IsRequired();
                entity.Property(x => x.Birthdate).IsRequired();
                entity.HasMany(x => x.Todos)
                    .WithOne(x => x.User)
                    .HasForeignKey(x => x.CreatedBy)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasData(DataContextSeeder.CreateSeedUser().ToArray());
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Title).HasMaxLength(100).IsRequired();
                entity.Property(x => x.Description).HasMaxLength(255);
                entity.Property(x => x.BackgroundColor).HasMaxLength(50);
                entity.HasData(DataContextSeeder.CreateSeedCategory().ToArray());
            });

            modelBuilder.Entity<Todo>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Title).HasMaxLength(255).IsRequired();
                entity.Property(x => x.Description).HasMaxLength(1000);
                entity.HasOne(x => x.Category);
                entity.HasData(DataContextSeeder.CreateSeedTodo().ToArray());
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(x => x.Id);
                entity.Property(x => x.Name).HasMaxLength(100).IsRequired();
                entity.HasData(DataContextSeeder.CreateSeedTag());
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

    public static class DataContextSeeder
    {
        public static IEnumerable<User> CreateSeedUser()
        {
            byte[] passwordSalt, passwordHash;
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("123"));
            }
            yield return new User
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
            };
        }

        public static IEnumerable<Category> CreateSeedCategory()
        {
            yield return new Category { Id = 1, Title = "National", Description = "National information", BackgroundColor = "#DDEBF7" };
            yield return new Category { Id = 2, Title = "Fashion", Description = "Fashion information", BackgroundColor = "#FEF6F6" };
            yield return new Category { Id = 3, Title = "Learning", Description = "Learning information", BackgroundColor = "#FAE2E2" };
            yield return new Category { Id = 4, Title = "Hobby", Description = "Hobby information", BackgroundColor = "#FBE6A2" };
        }

        public static IEnumerable<Todo> CreateSeedTodo()
        {
            return Enumerable.Range(1, 20)
                .Select(i => new Todo
                {
                    Id = i,
                    Title = $"Title-{i}",
                    Description = $"Desciption-{i}",
                    CreatedDate = DateTime.Now,
                    CreatedBy = 1,
                    IsCompleted = false,
                    CategoryId = (i % 4) + 1
                });
        }

        public static IEnumerable<Tag> CreateSeedTag()
        {
            yield return new Tag { Id = 1, Name = "National" };
            yield return new Tag { Id = 2, Name = "Fashion" };
            yield return new Tag { Id = 3, Name = "Learning" };
            yield return new Tag { Id = 4, Name = "Hobby" };
        }
    }
}