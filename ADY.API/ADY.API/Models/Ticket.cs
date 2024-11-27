namespace ADY.API.Models
{
	public class Ticket
	{
		public int TicketId { get; set; }
		public string FirstName { get; set; }
		public string Email { get; set; }
		public string LastName { get; set; }
		public string From { get; set; }
		public string To { get; set; }
		public string Date { get; set; }
		public string Time { get; set; }
		public string Seats { get; set; } 
		public decimal TotalPrice { get; set; }
		public DateTime CreatedOn { get; set; } = DateTime.Now;
		public int UserId { get; set; }
	}
}
