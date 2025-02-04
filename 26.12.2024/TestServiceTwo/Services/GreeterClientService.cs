using Grpc.Net.Client;
using TestServiceOne;

namespace TestServiceTwo.Services;

public class GreeterClientService
{
    private readonly ILogger<GreeterClientService> _logger;

    public GreeterClientService(ILogger<GreeterClientService> logger)
        => _logger = logger;

    public async Task<string> GetGreetingFromServiceOne(string name)
    {
        var channel = GrpcChannel.ForAddress("https://localhost:7100");
        var client = new Greeter.GreeterClient(channel);

        var request = new HelloRequest { Name = name };
        var reply = await client.SayHelloAsync(request);

        return reply.Message;
    }
}