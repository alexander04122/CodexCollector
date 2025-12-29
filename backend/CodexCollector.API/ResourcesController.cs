using CodexCollector.Core.Models;
using CodexCollector.Data.Data;
using Microsoft.AspNetCore.Mvc;

namespace CodexCollector.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResourcesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateResource([FromBody] Resource resource)
        {
            if (resource == null)
                return BadRequest();

            _context.Resources.Add(resource);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetResource), new { id = resource.Id }, resource);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);
            if (resource == null)
                return NotFound();
            return Ok(resource);
        }
    }
}
