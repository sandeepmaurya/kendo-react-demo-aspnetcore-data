namespace reactSpa.Models
{
    public class Product
    {
        public Product(int productId, string productName, short unitsInStock) : this(productId, productName, unitsInStock, 0) { }

        public Product(int productId, string productName, short unitsInStock, float unitPrice)
        {
            this.ProductId = productId;
            this.ProductName = productName;
            this.UnitsInStock = unitsInStock;
            this.UnitPrice = unitPrice;
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public float UnitPrice { get; set; }
        public string CategoryID { get; set; }
        public short? UnitsInStock { get; set; }
    }
}
