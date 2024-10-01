import { Request, Response } from "express";
import Customer, { ICustomer } from "../models/customer";

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNumber } = req.body;
    const newCustomer: ICustomer = new Customer({ name, email, phoneNumber });

    await newCustomer.save();

    res.status(201).json({status: true, message: "customer created successfully",data: newCustomer });

  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.find();
    res.status(200).json({status: true, message: "listing",data: customers });
  } catch (error) {
    res.status(500).json({ status: false,message: "Internal server error" });
  }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ status: false, message: "Customer not found" });
      return;
    }
    res.status(200).json({status: true, message: "Item",data: customer });

  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNumber } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber },
      { new: true },
    );

    if (!updatedCustomer) {
      res.status(404).json({status: false, message: "Customer not found" });
      return;
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({status: false, message: "Internal server error" });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      res.status(404).json({ status: false,message: "Customer not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: false,message: "Internal server error" });
  }
};
