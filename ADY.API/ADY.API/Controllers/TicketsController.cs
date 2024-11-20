using ADY.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ADY.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly MyDbContext dbContext;

        public TicketsController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

      
        [HttpPost]
        [Route("Create")]
        public IActionResult CreateTicket([FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            dbContext.Tickets.Add(ticket);
            dbContext.SaveChanges();
            return Ok("Ticket created successfully");
        }

     
        [HttpGet]
        [Route("GetTickets/{userId}")]
        public IActionResult GetTickets(int userId)
        {
            var tickets = dbContext.Tickets.Where(t => t.UserId == userId).ToList();

            if (tickets.Count == 0)
                return NotFound("No tickets found for this user.");

            return Ok(tickets);
        }
    }
}
