using Microsoft.AspNetCore.Mvc;
using TestServiceTwo.Services;

namespace TestServiceTwo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly GreeterClientService _clientService;

    public TestController(GreeterClientService clientService)
        => _clientService = clientService;


    [HttpGet("greet/{name}")]
    public async Task<IActionResult> GetGreeting([FromRoute] string name)
    {
        var message = await _clientService.GetGreetingFromServiceOne(name);
        return Ok(new { Greeting = message });
    }
}