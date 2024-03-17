package services

import play.api.libs.json._

import javax.inject.Singleton

case class Product(id: Long , name: String, price: Double)

object Product {
  implicit val productWrites: Writes[Product] = (product: Product) => {
    Json.obj(
      "id" -> product.id,
      "name" -> product.name,
      "price" -> product.price
    )
  }
  implicit val productFormat: Format[Product] = Json.format[Product]
}

@Singleton
class ProductService {
  private var products: Seq[Product] = Seq(
    Product(0, "Laptop", 1200.0),
    Product(1, "Smartphone", 800.0),
    Product(2, "Tablet", 500.0)
  )

  def getAllProducts: Seq[Product] = products

  def getProductById(id: Long): Option[Product] = products.find(_.id == id)

  def addProduct(product: Product): Unit = {
    val newId = if (products.isEmpty) 0 else products.map(_.id).max + 1
    val newProduct = product.copy(id = newId)
    products :+= newProduct
  }

  def deleteProduct(id: Long): Unit = {
    products = products.filterNot(_.id == id)
  }

  def updateProduct(id: Long, updatedProduct: Product): Unit = {
    products.find(_.id == id) match {
      case Some(existingProduct) =>
        val updated = existingProduct.copy(name = updatedProduct.name, price = updatedProduct.price)
        products = products.map(p => if (p.id == id) updated else p)
      case None =>
    }
  }
}
