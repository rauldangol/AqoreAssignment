using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/SalesTransaction")]
    public class SalesTransactionController : Controller
    {
        private readonly ApplicationDbContext _db;

        public SalesTransactionController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Get-Sales-Transaction")]
        public async Task<IActionResult> GetAllTransaction()
        {
            var result = await _db.SalesTransaction.FromSqlRaw("GetAllSaleTransaction").ToListAsync();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Single-Sales-Transaction/{id}")]
        public async Task<IActionResult> GetSingleTransaction(int id)
        {
            var result = await _db.SalesTransaction.FromSqlRaw("EXEC GetSalesTransactionById @TransactionId",
                new SqlParameter("@TransactionId", id)
            ).ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost("Add-Sales-Transaction")]
        public async Task<ActionResult> AddSalesTransaction(SalesTransaction salesTransaction)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC CreateSalesTransactionAPI @CustomerId, @ProductId, @Quantity, @TransactionDate",

                new SqlParameter("@CustomerId", salesTransaction.CustomerId),
                new SqlParameter("@ProductId", salesTransaction.ProductId),
                new SqlParameter("@Quantity", salesTransaction.Quantity),
                new SqlParameter("@TransactionDate", salesTransaction.TransactionDate)
                );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Sales-Transaction/{id}")]
        public async Task<IActionResult> UpdateSalesTransaction(int id, SalesTransaction salesTransaction)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC UpdateSalesTransactionAPI @TransactionId, @CustomerId, @ProductId, @Quantity, @TransactionDate",
                new SqlParameter("@TransactionId", id),
                new SqlParameter("@ProductId", salesTransaction.ProductId),
                new SqlParameter("@CustomerId", salesTransaction.CustomerId),
                new SqlParameter("@Quantity", salesTransaction.Quantity),
                new SqlParameter("@TransactionDate", salesTransaction.TransactionDate)

            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }


        [HttpDelete("Delete-Sales-Transaction/{id}")]
        public async Task<IActionResult> DeleteSalesTransaction(int id)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC DeleteSalesTransactionAPI @TransactionId",
                new SqlParameter("@TransactionId", id)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet("Get-Top-Three-Transactions")]
        public async Task<IActionResult> GetTopThreeTransactions()
        {
            var result = await _db.SalesTransaction.FromSqlRaw("EXEC GetTopThreeTransactions").ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

    }
}
