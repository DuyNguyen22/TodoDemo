using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Tags;
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
            CreateMap<Todo, TodoModel>()
                .ForMember(dest => dest.CategoryBackgroundColor, 
                           src => src.MapFrom(x => x.Category.BackgroundColor));
            CreateMap<TodoModel, Todo>();
            CreateMap<Tag, TagModel>();
            CreateMap<TagModel, Tag>();
        }
    }
}