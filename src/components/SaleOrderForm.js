import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/feature/orderSlice";

const SaleOrderForm = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: defaultValues || {
      customer_id: "",
      sku_id: "",
      price: 0,
      quantity: 0,
      paid: false,
      invoice_date: new Date(),
      invoice_no: "",
      products: [],
    },
  });

  const dispatch = useDispatch();
  const products = useSelector((state) => state.orders.products);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (defaultValues) {
      setValue("customer_id", defaultValues?.customer_id);
      setValue("invoice_no", defaultValues?.invoice_no);
      setValue("invoice_date", new Date(defaultValues?.invoice_date));
      setValue(
        "sku_id",
        defaultValues?.sku_id
          ? defaultValues?.sku_id
          : defaultValues?.items[0]?.sku_id
      );
      setValue(
        "price",
        defaultValues?.price
          ? defaultValues?.price
          : defaultValues?.items[0]?.price
      );
      setValue(
        "quantity",
        defaultValues?.quantity
          ? defaultValues?.quantity
          : defaultValues?.items[0]?.quantity
      );
      setValue("paid", defaultValues?.paid);
      setSelectedProducts(defaultValues?.products || []);
    }
  }, [defaultValues, setValue]);

  const onFormSubmit = (data) => {
    data.products = selectedProducts;
    onSubmit({
      ...data,
      invoice_date: data.invoice_date.toISOString().split("T")[0],
    });
  };

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
    sku_id: product.sku_id,
    price: product.price,
  }));

  return (
    <Box as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl>
        <FormLabel>Customer ID</FormLabel>
        <Input {...register("customer_id", { required: true })} />
      </FormControl>
      <FormControl>
        <FormLabel>Invoice Number</FormLabel>
        <Input {...register("invoice_no", { required: true })} />
      </FormControl>
      <FormControl>
        <FormLabel>Invoice Date</FormLabel>
        <Controller
          control={control}
          name="invoice_date"
          render={({ field }) => (
            <DatePicker
              className="css-1cjy4zv"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat="yyyy-MM-dd"
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Products</FormLabel>
        <Controller
          control={control}
          name="products"
          render={({ field }) => (
            <Select
              isMulti
              options={productOptions}
              value={selectedProducts}
              onChange={(selected) => {
                setSelectedProducts(selected);
                field.onChange(selected);
              }}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>SKU ID</FormLabel>
        <Input {...register("sku_id")} />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input type="number" {...register("price", { required: true })} />
      </FormControl>
      <FormControl>
        <FormLabel>Quantity</FormLabel>
        <Input type="number" {...register("quantity", { required: true })} />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel>Paid</FormLabel>
        <Switch {...register("paid")} />
      </FormControl>
      <Button type="submit" className="css-1cjy4zv">
        SUBMIT
      </Button>
    </Box>
  );
};

export default SaleOrderForm;
