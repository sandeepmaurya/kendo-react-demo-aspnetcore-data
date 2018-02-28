using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using reactSpa.Models;

namespace reactSpa.Controllers
{
    [Produces("application/json")]
    public class ProductsController : Controller
    {
        // GET: api/Products
        [HttpGet]
        [Route("/api/Products")]
        public JsonResult GetProducts(int numRecords)
        {
            List<Product> products = new List<Product>();
            for (short i = 1; i <= numRecords; i++)
            {
                products.Add(new Product(i, new string('a', 100), i, i));
            }

            return Json(products);
        }

        [HttpGet]
        [Route("/api/Products/ProductsByCategory/{categoryId:int}")]
        public JsonResult GetProductsByCategory(int categoryId)
        {
            List<Product> products = new List<Product>();
            for (short i = 1; i <= 1000; i++)
            {
                products.Add(new Product(i, new string('a', 100), i, i));
            }

            return Json(products);
        }

        [HttpGet]
        [Route("/api/Products/Categories")]
        public JsonResult GetCategories()
        {
            List<Category> categories = new List<Category>();
            for (short i = 1; i <= 500; i++)
            {
                categories.Add(new Category
                {
                    CategoryId = i,
                    CategoryName = "Category_" + i,
                    Description = new string('c', 100)
                });
            }

            return Json(categories);
        }
    }
}