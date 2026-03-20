"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Plus, Wrench, CircleDollarSign, UserCheck, Code, PackageSearch, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Hooks e Componentes
import { useProduct } from "@/hooks/crm/product";
import { useService } from "@/hooks/crm/service";
import ProductRegistrationDialog from "./dialog-form-product";
import ServiceRegistrationDialog from "../service/dialog-form-product"; // Verifique se o caminho está correto
import { IProduct } from "@/types/crm/product";
import { IService } from "@/types/crm/service";

export const QuoteItemsSidebar = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);

  const { isLoading: isLoadingProducts, products } = useProduct();
  const { isLoading: isLoadingServices, services } = useService();

  // Função para lidar com o botão de adicionar dinâmico
  const handleAddClick = () => {
    if (activeTab === "products") setProductModalOpen(true);
    else setServiceModalOpen(true);
  };

  return (
    <div>
      <Card className="w-full lg:w-96 h-fit rounded-xl shadow-lg border-muted/50 overflow-hidden bg-background">
        <CardHeader className="p-5 pb-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-xl font-bold tracking-tight">Items Selection</CardTitle>
            <div className="flex items-center gap-2">
              {/* Botão Dinâmico: Abre o modal da aba ativa */}
              <Button
                onClick={handleAddClick}
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full hover:bg-primary hover:text-white transition-all shadow-sm"
                title={activeTab === "products" ? "Novo Produto" : "Novo Serviço"}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Badge variant="outline" className="font-mono text-[10px] px-2 py-0.5 rounded-full">CRM V1</Badge>
            </div>
          </div>
          <CardDescription className="text-sm">
            Add {activeTab === "products" ? "products" : "services"} to your quote.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="products" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none bg-muted/50 p-1 h-12">
              <TabsTrigger value="products" className="rounded-lg gap-2 text-sm">
                <Package className="h-4 w-4" /> Products
              </TabsTrigger>
              <TabsTrigger value="services" className="rounded-lg gap-2 text-sm">
                <Wrench className="h-4 w-4" /> Services
              </TabsTrigger>
            </TabsList>

            {/* --- ABA DE PRODUTOS --- */}
            <TabsContent value="products" className="p-0 m-0">
              <ScrollArea className="h-112.5 p-4">
                <div className="space-y-3">
                  {isLoadingProducts ? (
                    <LoadingSkeleton />
                  ) : products?.length === 0 ? (
                    <EmptyState type="products" onAdd={() => setProductModalOpen(true)} />
                  ) : (
                    products?.map((product: IProduct) => (
                      <div key={product.id} className="group flex items-center justify-between rounded-xl bg-accent/30 p-3 hover:bg-accent/70 transition-all border border-transparent hover:border-muted-foreground/20 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-background border"><Package className="h-5 w-5 text-primary/60" /></div>
                          <div>
                            <p className="font-semibold text-sm leading-none">{product.nome_produto}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{product.marca} • Stock: {product.stock}</p>
                            <p className="text-xs font-bold text-green-600 mt-1">
                              {product.valor_final.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                            </p>
                          </div>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* --- ABA DE SERVIÇOS --- */}
            <TabsContent value="services" className="p-0 m-0">
              <ScrollArea className="h-112.5 p-4">
                <div className="space-y-3">
                  {isLoadingServices ? (
                    <LoadingSkeleton />
                  ) : services?.length === 0 ? (
                    <EmptyState type="services" onAdd={() => setServiceModalOpen(true)} />
                  ) : (
                    services?.map((service: IService) => (
                      <div key={service.id} className="group flex flex-col rounded-xl bg-accent/20 border border-muted/50 p-3 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-primary/70" />
                            <span className="font-bold text-sm">{service.nome_servico}</span>
                          </div>
                          <Button size="icon" className="h-7 w-7 rounded-full">
                            <Plus className="h-3.3 w-3.3" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Code className="h-3 w-3" /> {service.codigo_servico}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground justify-end">
                            <UserCheck className="h-3 w-3" /> Equipa: {service.quantidade_equipa}
                          </div>
                          <div className="col-span-2 flex items-center justify-between mt-1 pt-2 border-t border-muted/30">
                            <span className="text-xs font-semibold text-green-700">
                              {service.custo.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
                            </span>
                            {service.imposto_retencao_fonte && (
                              <Badge variant="outline" className="text-[9px] py-0 h-4 text-orange-600 border-orange-200">Retenção</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ProductRegistrationDialog open={productModalOpen} setOpen={setProductModalOpen} />
      <ServiceRegistrationDialog open={serviceModalOpen} setOpen={setServiceModalOpen} />
    </div>
  );
};

// Componentes Auxiliares para Limpeza do Código
const LoadingSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-20 w-full rounded-xl bg-muted animate-pulse" />
    ))}
  </div>
);

const EmptyState = ({ type, onAdd }: { type: string, onAdd: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
    <PackageSearch className="h-10 w-10 mb-2 opacity-20" />
    <p className="text-sm">No {type} found.</p>
    <Button variant="link" size="sm" onClick={onAdd}>Create first {type.slice(0, -1)}</Button>
  </div>
);