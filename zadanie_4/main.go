package main

import (
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Name  string
	Price int
}

type Cart struct {
	gorm.Model
	ProductID uint
	Quantity  int
	UserID    uint
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Product{})

	db.AutoMigrate(&Cart{})

	e := echo.New()
	e.Use(middleware.CORS())

	e.POST("/products", createProduct)
	e.GET("/products", getProducts)
	e.GET("/products/:id", getProduct)
	e.PUT("/products/:id", updateProduct)
	e.DELETE("/products/:id", deleteProduct)

	e.POST("/carts", addToCart)

	e.Start(":8080")
}

func createProduct(c echo.Context) error {
	product := &Product{}
	if err := c.Bind(product); err != nil {
		return err
	}
	db.Create(product)
	return c.JSON(http.StatusCreated, product)
}

func getProducts(c echo.Context) error {
	var products []Product
	db.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func getProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	if err := db.First(&product, id).Error; err != nil {
		return echo.ErrNotFound
	}
	return c.JSON(http.StatusOK, product)
}

func updateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	if err := db.First(&product, id).Error; err != nil {
		return echo.ErrNotFound
	}
	updatedProduct := &Product{}
	if err := c.Bind(updatedProduct); err != nil {
		return err
	}
	product.Name = updatedProduct.Name
	product.Price = updatedProduct.Price
	db.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func deleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	if err := db.First(&product, id).Error; err != nil {
		return echo.ErrNotFound
	}
	db.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}

func addToCart(c echo.Context) error {
	cartItem := &Cart{}
	if err := c.Bind(cartItem); err != nil {
		return err
	}
	db.Create(cartItem)
	return c.JSON(http.StatusCreated, cartItem)
}
