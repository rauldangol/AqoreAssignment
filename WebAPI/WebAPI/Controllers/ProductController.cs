using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Get-Product")]
        public async Task<IActionResult> GetAllProduct()
        {
            var result = await _db.Product.FromSqlRaw("GetAllProduct").ToListAsync();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Single-Product/{id}")]
        public async Task<IActionResult> GetSingleProduct(int id)
        {
            var result = await _db.Product.FromSqlRaw("EXEC GetProductById @ProductId",
                new SqlParameter("@ProductId", id)
            ).ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("Add-Product")]
        public async Task<ActionResult> AddProduct(Product product)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC CreateProductAPI @CategoryId, @ProductName, @Price, @RemainingQuantity",

                new SqlParameter("@CategoryId", product.CategoryId),
                new SqlParameter("@ProductName", product.ProductName),
                new SqlParameter("@Price", product.Price),
                new SqlParameter("@RemainingQuantity", product.RemainingQuantity)
                );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Product/{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC UpdateProductAPI @ProductId, @CategoryId, @ProductName, @Price, @RemainingQuantity",
                new SqlParameter("@ProductId", id),
                new SqlParameter("@CategoryId", product.CategoryId),
                new SqlParameter("@ProductName", product.ProductName),
                new SqlParameter("@Price", product.Price),
                new SqlParameter("@RemainingQuantity", product.RemainingQuantity)

            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }


        [HttpDelete("Delete-Product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC DeleteProductAPI @ProductId",
                new SqlParameter("@ProductId", id)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Product-Quantity/{id}")]
        public async Task<IActionResult> UpdateProductQuantity(int id, Product productRequest)
        {
            var product = await _db.Product.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            if (product.RemainingQuantity < productRequest.RemainingQuantity)
            {
                return BadRequest("Insufficient quantity");
            }

            product.RemainingQuantity -= productRequest.RemainingQuantity;

            try
            {
                await _db.SaveChangesAsync();
                return Ok(product);
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "ERROR in updating remaining quantity");
            }
        }


        [HttpGet("Get-Product-With-Highest-Sales")]
        public async Task<IActionResult> GetProductWithHighestSales()
        {
            var result = await _db.Product.FromSqlRaw("EXEC GetProductWithHighestSales").ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Product-With-Lowest-Sales")]
        public async Task<IActionResult> GetProductWithLowestSales()
        {
            var result = await _db.Product.FromSqlRaw("EXEC GetProductWithLowestSales").ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Product-With-Lowest-Quantity")]
        public async Task<IActionResult> GetProductWithLowestQuantity()
        {
            var result = await _db.Product.FromSqlRaw("EXEC GetProductWithLowestQuantity").ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }



    }
}
