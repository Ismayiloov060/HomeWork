using ADY.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace ADY.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext dbContext;
        public UsersController(MyDbContext dbContext)
        {
            this.dbContext = dbContext;
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
                return Ok("User registed successfully");
            }
            else
            {
                return BadRequest("User alredy exists with the same email adress");
            }
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            var user = dbContext.Users.FirstOrDefault(x =>  x.Email == loginDTO.Email && x.Password == loginDTO.Password);
            if(user != null)
            {
                return Ok(user);
            }

          return NoContent();
        }


        [HttpGet]
        [Route("Get Users")]
        public IActionResult GetUsers()
        {
            return Ok(dbContext.Users.ToList());    
        }


        [HttpGet]
        [Route("Get User")]
        public IActionResult GetUser(int id)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user != null)
                return Ok();
            else
                return NoContent();
            
        }
    }
}
