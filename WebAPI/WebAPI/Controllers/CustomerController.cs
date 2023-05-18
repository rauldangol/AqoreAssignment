using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/Customer")]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _db;

        public CustomerController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Get-Customer")]
        public async Task<IActionResult> GetAllCustomer()
        {
            var result = await _db.Customer.FromSqlRaw("GetAllCustomer").ToListAsync();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Single-Customer/{id}")]
        public async Task<IActionResult> GetSingleProduct(int id)
        {
            var result = await _db.Customer.FromSqlRaw("EXEC GetCustomerById @CustomerId",
                new SqlParameter("@CustomerId", id)
            ).ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("Add-Customer")]
        public async Task<ActionResult> AddCustomer(Customer customer)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC CreateCustomerAPI @FullName, @Email",

                new SqlParameter("@FullName", customer.FullName),
                new SqlParameter("@Email", customer.Email)
                );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Customer/{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC UpdateCustomerAPI @CustomerId, @FullName, @Email",
                new SqlParameter("@CustomerId", id),
                new SqlParameter("@FullName", customer.FullName),
                new SqlParameter("@Email", customer.Email)

            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }


        [HttpDelete("Delete-Customer/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC DeleteCustomerAPI @CustomerId",
                new SqlParameter("@CustomerId", id)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }



    }
}
