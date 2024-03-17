// ProductController.scala
package controllers

import play.api.libs.json.Format.GenericFormat

import javax.inject._
import play.api.mvc._
import play.api.libs.json._
import services.{Product, ProductService}

@Singleton
class ProductController @Inject()(productService: ProductService, cc: ControllerComponents) extends AbstractController(cc) {

  def getAllProducts = Action { implicit request: Request[AnyContent] =>
    Ok(Json.toJson(productService.getAllProducts))
  }

  def getProductById(id: Long) = Action { implicit request: Request[AnyContent] =>
    productService.getProductById(id) match {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound
    }
  }

  def addProduct = Action(parse.json) { implicit request =>
    request.body.validate[Product].fold(
      errors => {
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
      },
      product => {
        productService.addProduct(product)
        Created(Json.obj("message" -> "Product added successfully"))
      }
    )
  }

  def deleteProduct(id: Long) = Action {
    productService.getProductById(id) match {
      case Some(_) =>
        productService.deleteProduct(id)
        Ok(Json.obj("message" -> "Product deleted successfully"))
      case None =>
        NotFound(Json.obj("message" -> "Product not found"))
    }
  }

  def updateProduct(id: Long) = Action(parse.json) { implicit request =>
    request.body.validate[Product].fold(
      errors => {
        BadRequest(Json.obj("message" -> JsError.toJson(errors)))
      },
      product => {
        if (productService.getProductById(id).isDefined) {
          productService.updateProduct(id, product)
          Ok(Json.obj("message" -> "Product updated successfully"))
        } else {
          NotFound(Json.obj("message" -> "Product not found"))
        }
      }
    )
  }
}
