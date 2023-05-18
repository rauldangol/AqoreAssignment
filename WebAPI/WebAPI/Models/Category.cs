﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
