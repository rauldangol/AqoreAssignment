using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class SalesTransaction
    {
        [Key]
        public int TransactionId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime TransactionDate { get; set; }


    }
}
