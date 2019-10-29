using System.Linq;
using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Todos;
using WebApi.Models.Users;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateUserProfileModel, User>();
            // CreateMap<TodoTag, string>()
            //     .ForMember(dest => dest, src => src.MapFrom(x => x.Tag));//opt => opt.ConvertUsing(new TodoTagToStringConverter()));
            CreateMap<Todo, TodoModel>()
                .ForMember(dest => dest.CategoryBackgroundColor, 
                           src => src.MapFrom(x => x.Category.BackgroundColor))
                .AfterMap((s, d) => 
                    {
                        if (s.TodoTags != null && s.TodoTags.Any())
                            d.Tags = s.TodoTags.Select(x => x.Tag).ToList();
                    });
                // .ForMember(dest => dest.Tags,
                //            src => src.MapFrom(x => x.TodoTags));
            CreateMap<TodoModel, Todo>();
        }
    }

    public class TodoTagToStringConverter : IValueConverter<TodoTag, string>
    {
        public string Convert(TodoTag source, ResolutionContext context)
        {
            return source.Tag;
        }
    }
}