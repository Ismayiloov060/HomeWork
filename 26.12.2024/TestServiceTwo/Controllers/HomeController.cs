using Microsoft.AspNetCore.Mvc;
using TestServiceTwo.Services;

namespace TestServiceTwo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
   [HttpGet]
   public IActionResult Get()
   {
      return Ok("Salam");
   }
}