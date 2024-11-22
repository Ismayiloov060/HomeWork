using ADY.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ADY.API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly MyDbContext dbContext;
		private readonly ILogger<UsersController> logger;

		public UsersController(MyDbContext dbContext, ILogger<UsersController> logger)
		{
			this.dbContext = dbContext;
			this.logger = logger;
		}

	
		[HttpPost]
		[Route("Registration")]
		public IActionResult Registration(UserDTO userDTO)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var objUser = dbContext.Users.SingleOrDefault(x => x.Email == userDTO.Email);
			if (objUser == null)
			{
				dbContext.Users.Add(new User
				{
					FirstName = userDTO.FirstName,
					LastName = userDTO.LastName,
					Email = userDTO.Email,
					Password = userDTO.Password
				});
				dbContext.SaveChanges();
				return Ok("User registered successfully");
			}
			else
			{
				return BadRequest("User already exists with the same email address");
			}
		}

		
		[HttpPost]
		[Route("Login")]
		public IActionResult Login(LoginDTO loginDTO)
		{
			try
			{
				var user = dbContext.Users.FirstOrDefault(x => x.Email == loginDTO.Email && x.Password == loginDTO.Password);
				if (user != null)
				{
					return Ok(user);
				}

				return NoContent();
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error during login");
				return StatusCode(500, "Internal server error");
			}
		}

		
		[HttpGet]
		[Route("GetUserData")]
		public IActionResult GetUserData(string email)
		{
			try
			{
				var user = dbContext.Users.FirstOrDefault(x => x.Email == email);
				if (user != null)
				{
					return Ok(new
					{
						FirstName = user.FirstName,
						LastName = user.LastName,
						Email = user.Email
					});
				}
				else
				{
					return NoContent(); 
				}
			}
			catch (Exception ex)
			{
				logger.LogError(ex, "Error fetching user data");
				return StatusCode(500, "Internal server error");
			}
		}

		
		[HttpGet]
		[Route("GetUsers")]
		public IActionResult GetUsers()
		{
			return Ok(dbContext.Users.ToList());
		}

		
		[HttpGet]
		[Route("GetUser")]
		public IActionResult GetUser(int id)
		{
			var user = dbContext.Users.FirstOrDefault(x => x.UserId == id);
			if (user != null)
				return Ok(user);
			else
				return NoContent();
		}
	}
}
