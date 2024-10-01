import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_name, description, price, color } = req.body;
    const newProduct: IProduct = new Product({ product_name, description, price,color });

    await newProduct.save();

    res.status(201).json({status: true, message: "Product created successfully",data: newProduct });

  } catch (error) {
      
    res.status(500).json({status: false, message: error });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({status: true, message: "listing",data: products });
  } catch (error) {
    res.status(500).json({ status: false,message: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ status: false, message: "product not found" });
      return;
    }
    res.status(200).json({status: true, message: "Item",data: product });

  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product_name, description, price,color } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { product_name, description, price,color },
      { new: true },
    );

    if (!updatedProduct) {
      res.status(404).json({status: false, message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      res.status(404).json({ status: false,message: "Product not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: false,message: "Internal server error" });
  }
};
