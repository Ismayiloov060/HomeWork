using ADY.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
		public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
		{
			
			Console.WriteLine($"Received Ticket: {ticket.FirstName}, {ticket.Email}, {ticket.Seats}");

			if (!ModelState.IsValid)
			{
				
				foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
				{
					Console.WriteLine(error.ErrorMessage);
				}
				return BadRequest(ModelState);
			}

			try
			{
				dbContext.Tickets.Add(ticket);
				await dbContext.SaveChangesAsync();

				return Ok(new
				{
					Message = "Ticket created successfully",
					Ticket = ticket
				});
			}
			catch (Exception ex)
			{
			
				Console.WriteLine($"Error: {ex.Message}");
				return StatusCode(500, new { Message = "Failed to create ticket", Error = ex.Message });
			}
		}

		[HttpGet]
		[Route("GetByTicketId")]
		public async Task<IActionResult> GetTicketByTicketId(int ticketId)
		{
			var ticket = await dbContext.Tickets.FirstOrDefaultAsync(t => t.TicketId == ticketId);

			if (ticket == null)
			{
				return NotFound(new { Message = "Ticket not found" });
			}

			return Ok(ticket);
		}

		[HttpGet]
		[Route("GetByUserId")]
		public async Task<IActionResult> GetTicketsByUserId(int userId)
		{
			var tickets = await dbContext.Tickets
				.Where(t => t.UserId == userId)
				.ToListAsync();

			if (!tickets.Any())
			{
				return NotFound(new { Message = "No tickets found for the specified user" });
			}

			return Ok(tickets);
		}
	}
}
