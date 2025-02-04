using TestServiceOne.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddGrpc();
builder.Services.AddSingleton<GreeterService>();

var app = builder.Build();

app.MapGrpcService<GreeterService>();

app.UseRouting();


app.Run();
