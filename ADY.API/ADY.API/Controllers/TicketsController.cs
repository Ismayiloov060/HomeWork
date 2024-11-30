using ADY.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ADY.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly MyDbContext _dbContext;

        public TicketsController(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid ticket data", Errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
            }

            try
            {
                ticket.CreatedOn = DateTime.UtcNow;
                _dbContext.Tickets.Add(ticket);
                await _dbContext.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Ticket created successfully",
                    Ticket = ticket
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while creating the ticket", Error = ex.Message });
            }
        }

        [HttpGet]
        [Route("{ticketId}")]
        public async Task<IActionResult> GetTicketById(int ticketId)
        {
            var ticket = await _dbContext.Tickets.FindAsync(ticketId);

            if (ticket == null)
            {
                return NotFound(new { Message = "Ticket not found" });
            }

            return Ok(ticket);
        }

        [HttpGet]
        [Route("User/{userId}")]
        public async Task<IActionResult> GetTicketsByUserId(int userId)
        {
            var tickets = await _dbContext.Tickets
                .Where(t => t.UserId == userId)
                .ToListAsync();

            if (!tickets.Any())
            {
                return NotFound(new { Message = "No tickets found for the specified user" });
            }

            return Ok(tickets);
        }

        [HttpGet]
        [Route("All")]
        public async Task<IActionResult> GetAllTickets()
        {
            try
            {
                var tickets = await _dbContext.Tickets.ToListAsync();

                if (!tickets.Any())
                {
                    return NotFound(new { Message = "No tickets found" });
                }

                return Ok(tickets);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while retrieving the tickets", Error = ex.Message });
            }
        }

        [HttpPut]
        [Route("Update/{ticketId}")]
        public async Task<IActionResult> UpdateTicket(int ticketId, [FromBody] Ticket updatedTicket)
        {
            var existingTicket = await _dbContext.Tickets.FindAsync(ticketId);

            if (existingTicket == null)
            {
                return NotFound(new { Message = "Ticket not found" });
            }

            try
            {
                existingTicket.FullName = updatedTicket.FullName;
                existingTicket.Email = updatedTicket.Email;
                existingTicket.From = updatedTicket.From;
                existingTicket.To = updatedTicket.To;
                existingTicket.Date = updatedTicket.Date;
                existingTicket.Time = updatedTicket.Time;
                existingTicket.Seats = updatedTicket.Seats;
                existingTicket.TotalPrice = updatedTicket.TotalPrice;

                await _dbContext.SaveChangesAsync();

                return Ok(new { Message = "Ticket updated successfully", Ticket = existingTicket });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating the ticket", Error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("Delete/{ticketId}")]
        public async Task<IActionResult> DeleteTicket(int ticketId)
        {
            var ticket = await _dbContext.Tickets.FindAsync(ticketId);

            if (ticket == null)
            {
                return NotFound(new { Message = "Ticket not found" });
            }

            try
            {
                _dbContext.Tickets.Remove(ticket);
                await _dbContext.SaveChangesAsync();

                return Ok(new { Message = "Ticket deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting the ticket", Error = ex.Message });
            }
        }
    }
}
