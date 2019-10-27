using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using System.Linq;
using AutoMapper;
using System.Collections.Generic;
using WebApi.Models.Tags;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TagController : ControllerBase
    {
        private ITagService _tagService;
        private IMapper _mapper;

        public TagController(ITagService tagService,IMapper mapper)
        {
            this._tagService = tagService;
            this._mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tags = _mapper.Map<IList<TagModel>>(_tagService.GetAll());
            return Ok(tags.ToArray());
        }
    }
}