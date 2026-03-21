"use client";

import React from "react";
import DialogContainer from "@/components/generic/dialog-container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/crm/product";
import { toast } from "@/hooks/use-toast";

// 1. Schema atualizado para o Produto
const productSchema = z.object({
  nome_produto: z.string().min(3, { message: "Name too short" }),
  marca: z.string().min(1, { message: "Brand not informed" }),
  modelo: z.string().min(1, { message: "Model not informed" }),
  fabricante: z.string().optional(),
  grupo: z.string().min(1, { message: "Select a group" }),
  preco_fornecedor: z.coerce.number().min(0.01, { message: "Price too low" }),
  percentagem_lucro: z.coerce.number().min(0, { message: "Profit too low" }),
  valor_final: z.coerce.number(),
  iva: z.boolean().default(true),
  stock: z.coerce.number().min(0, { message: "Stock cannot be negative" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

function ProductRegistrationDialog({ open, setOpen }: ProductDialogProps) {
  const { createProduct } = useProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome_produto: "",
      marca: "",
      modelo: "",
      fabricante: "",
      grupo: "",
      preco_fornecedor: 0,
      percentagem_lucro: 0,
      valor_final: 0,
      iva: true,
      stock: 0,
    },
  });

  const { watch, setValue, formState: { isSubmitting } } = form;

  // Lógica para calcular valor final automaticamente quando preço ou lucro mudam
  const preco = watch("preco_fornecedor");
  const lucro = watch("percentagem_lucro");

  React.useEffect(() => {
    const final = preco + (preco * lucro) / 100;
    setValue("valor_final", final);
  }, [preco, lucro, setValue]);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      // Aqui você chamaria seu hook useProduct() ou API
      console.log("Registrando Produto:", values);
      createProduct({
        fabricante: values.fabricante ?? "",
        grupo: values.grupo,
        marca: values.marca,
        iva: values.iva,
        preco_fornecedor: values.preco_fornecedor,
        percentagem_lucro: values.percentagem_lucro,
        stock: values.stock,
        valor_final: values.valor_final,
        modelo: values.modelo,
        nome_produto: values.nome_produto
      });

      toast({title: "Success", description: "Product registered successfully!"});
      setOpen(false);
      form.reset();
    } catch (err) {
      console.error("Error creating product:", err);
      toast({description: "Error creating product: Please try again."});
    }
  };

  return (
    <DialogContainer
      className="sm:max-w-2xl"
      open={open}
      setOpen={setOpen}
      title="Register New Product"
      description="Enter the technical and commercial data of the product."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* NOME DO PRODUTO */}
          <FormField
            control={form.control}
            name="nome_produto"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Laptop Dell XPS 15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Input placeholder="Dell" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <Input placeholder="XPS 15 9520" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fabricante"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturer</FormLabel>
                  <Input placeholder="Dell Inc." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grupo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group / Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Computer">Computer</SelectItem>
                      <SelectItem value="Peripherals">Peripherals</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-4" />

          {/* FINANCEIRO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-muted/30 p-4 rounded-xl">
            <FormField
              control={form.control}
              name="preco_fornecedor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Price</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="percentagem_lucro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor_final"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-bold">Final Value</FormLabel>
                  <FormControl>
                    <Input type="number" readOnly className="bg-background font-bold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center space-x-8 pt-2">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel> Stock</FormLabel>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iva"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Aplly IVA</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <DialogFooter className="pt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContainer>
  );
}

export default ProductRegistrationDialog;