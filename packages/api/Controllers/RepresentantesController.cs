using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Chromatech.Api.Models;
using Chromatech.Api.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chromatech.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Rota: /api/representantes
    public class RepresentantesController : ControllerBase
    {
        private readonly DataContext _context;

        public RepresentantesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/representantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Representante>>> GetRepresentantes()
        {
            var representantes = await _context.Representantes.ToListAsync();
            return Ok(representantes);
        }
    }
}