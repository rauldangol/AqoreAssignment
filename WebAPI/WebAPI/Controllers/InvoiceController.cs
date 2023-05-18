using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/Invoice")]
    public class InvoiceController : Controller
    {
        private readonly ApplicationDbContext _db;

        public InvoiceController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Get-Invoice")]
        public async Task<IActionResult> GetAllInvoice()
        {
            var result = await _db.Invoice.FromSqlRaw("GetAllInvoice").ToListAsync();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Single-Invoice/{id}")]
        public async Task<IActionResult> GetSingleInvoice(int id)
        {
            var result = await _db.Invoice.FromSqlRaw("EXEC GetInvoiceById @InvoiceId",
                new SqlParameter("@InvoiceId", id)
            ).ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost("Add-Invoice")]
        public async Task<ActionResult> AddInvoice(Invoice invoice)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC CreateInvoiceAPI @CustomerId, @InvoiceDate, @TotalAmount, @Discount, @DiscountedAmount",

                new SqlParameter("@CustomerId", invoice.CustomerId),
                new SqlParameter("@InvoiceDate", invoice.InvoiceDate),
                new SqlParameter("@TotalAmount", invoice.TotalAmount),
                new SqlParameter("@Discount", invoice.Discount),
                new SqlParameter("@DiscountedAmount", invoice.DiscountedAmount)
                );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Invoice/{id}")]
        public async Task<IActionResult> UpdateInvoice(int id, Invoice invoice)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC UpdateInvoiceAPI @InvoiceId, @CustomerId, @InvoiceDate, @TotalAmount, @Discount, @DiscountedAmount",
                new SqlParameter("@InvoiceId", id),
                new SqlParameter("@CustomerId", invoice.CustomerId),
                new SqlParameter("@InvoiceDate", invoice.InvoiceDate),
                new SqlParameter("@TotalAmount", invoice.TotalAmount),
                new SqlParameter("@Discount", invoice.Discount),
                new SqlParameter("@DiscountedAmount", invoice.DiscountedAmount)

            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("Delete-Invoice/{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC DeleteInvoiceAPI @InvoiceId",
                new SqlParameter("@InvoiceId", id)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }


    }
}
