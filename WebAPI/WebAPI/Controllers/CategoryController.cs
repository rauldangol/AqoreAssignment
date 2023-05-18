using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/Category")]
    public class CategoryController : Controller
    {
        private readonly ApplicationDbContext _db;

        public CategoryController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("Get-Category")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _db.Category.FromSqlRaw("GetAllCategory").ToListAsync();
            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("Get-Single-Category/{id}")]
        public async Task<IActionResult> GetSingleCategory(int id)
        {
            var result = await _db.Category.FromSqlRaw("EXEC GetCategoryById @CategoryId",
                new SqlParameter("@CategoryId", id)
            ).ToListAsync();

            if (result == null || result.Count == 0)
            {
                return NotFound();
            }

            return Ok(result);
        }


        [HttpPost("Add-Category")]
        public async Task<ActionResult> AddCategory(Category category)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC CreateCategoryAPI @CategoryName",

                new SqlParameter("@CategoryName", category.CategoryName)
                );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("Update-Category/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC UpdateCategoryAPI @CategoryId, @CategoryName",
                new SqlParameter("@CategoryId", id),
                new SqlParameter("@CategoryName", category.CategoryName)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }


        [HttpDelete("Delete-Category/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _db.Database.ExecuteSqlRawAsync("EXEC DeleteCategoryAPI @CategoryId",
                new SqlParameter("@CategoryId", id)
            );

            if (result <= 0)
            {
                return BadRequest();
            }

            return Ok();
        }
    }
}
