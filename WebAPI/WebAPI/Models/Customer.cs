using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }

    }
}
