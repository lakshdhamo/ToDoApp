using ToDo.Data.Context;
using ToDo.Data.Entities;
using ToDo.Data.Repository;
using ToDo.Domain.Interfaces;
using ToDo.Domain.Interfaces.RepositoryInterface;
using ToDo.Domain.Services;
using ToDoAppApi.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ToDoItemContext>();
builder.Services.AddScoped<IToDoItemRepostory, ToDoItemRepository>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();   
builder.Services.AddMemoryCache();
builder.Services.AddScoped<IToDoService, ToDoService>();
builder.Services.AddSingleton<ILogger>(svc => svc.GetRequiredService<ILogger<ToDoController>>());
builder.Services.AddScoped<ICacheManager, InMemoryCacheManager>();

builder.Services.Configure<ConnectionStringOptions>(builder.Configuration.GetSection(ConnectionStringOptions.Position));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthorization();

app.MapControllers();

app.Run();
