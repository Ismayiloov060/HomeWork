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
        public IActionResult Registration(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objUser = dbContext.Users.SingleOrDefault(x => x.Email == user.Email);
            if (objUser == null)
            {
                dbContext.Users.Add(user);
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
        public IActionResult Login(User user)
        {
            var loggedUser = dbContext.Users
                .FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);

            if (loggedUser != null)
            {
                return Ok(loggedUser);
            }
            return Unauthorized("Invalid credentials");
        }

        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            return Ok(dbContext.Users.ToList());
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            dbContext.Users.Remove(user);
            dbContext.SaveChanges();

            return Ok("User deleted successfully");
        }
    }
}
