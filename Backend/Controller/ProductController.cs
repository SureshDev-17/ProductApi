using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EFCoreLearning.Model;
using EFCoreLearning.Data;


namespace EFCoreLearning.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _context.products.FindAsync(id);

            if (product == null)
                return NotFound();

            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            _context.products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,Product updateProduct)
        {
            var product = await _context.products.FindAsync(id);
            if(product == null)
                return NotFound();

            product.Name = updateProduct.Name;
            product.Price = updateProduct.Price;

            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.products.FindAsync(id);

            if(product == null)
                return NotFound();

            _context.products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok("Product Deleted Successfully.");
        }
    }
}
