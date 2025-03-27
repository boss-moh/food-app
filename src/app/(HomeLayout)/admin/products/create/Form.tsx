"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  API_END_POINT,
  URL_PATHS,
  option,
  createProductType,
  createProductSchema,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios, useMutation } from "@/lib";
import { Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoadingButton, Selecter } from "@/components/share";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import React from "react";
import ImageInput, { useImageInput } from "@/components/share/ImageInput";
import { useRouter } from "next/navigation";

type ProductFormProps = {
  defaultValues?: createProductType;
  categories: option[];
};

const values = {
  id: null,
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  prepTime: 0,
  ingredients: [""],
  nutritionalInfo: [""],
  imageUrl: "",
};

export default function ProductForm({
  defaultValues = values,
  categories,
}: ProductFormProps) {
  const router = useRouter();
  const form = useForm<createProductType>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
  });

  const imagePorps = useImageInput(
    (url) => form.setValue("imageUrl", url),
    defaultValues.imageUrl
  );

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      return await axios.post(API_END_POINT.PRODUCT.CREATE, form.getValues());
    },
    onError() {
      toast.error("there is error happen");
    },
    onSuccess() {
      clear();
      toast.success("New Dish has been created.");
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }

    mutate();
  }

  const clear = () => {
    router.replace(URL_PATHS.ADMIN.PRODUCT.CREATE);
    form.reset(values);
    imagePorps.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(!value ? "" : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prepTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prep Time</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(!value ? "" : Number(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Selecter
                    onChange={(id) => field.onChange(id)}
                    options={categories}
                    defaultValue={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-72">
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <ImageInput {...imagePorps} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {field.value.map((ingredient: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => {
                          const newIngredients = [...field.value];
                          newIngredients[index] = e.target.value;
                          field.onChange(newIngredients);
                        }}
                        placeholder={`Ingredient ${index + 1}`}
                      />
                      {field.value.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newIngredients = [...field.value];
                            newIngredients.splice(index, 1);
                            field.onChange(newIngredients);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove ingredient</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nutritionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>nutritionalInfo</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  {field.value.map((nutritionalInfo: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={nutritionalInfo}
                        onChange={(e) => {
                          const newnutritionalInfos = [...field.value];
                          newnutritionalInfos[index] = e.target.value;
                          field.onChange(newnutritionalInfos);
                        }}
                        placeholder={`nutritionalInfo ${index + 1}`}
                      />
                      {field.value.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const newnutritionalInfos = [...field.value];
                            newnutritionalInfos.splice(index, 1);
                            field.onChange(newnutritionalInfos);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">
                            Remove nutritionalInfo
                          </span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => field.onChange([...field.value, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Ingredient
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />

        <div className="flex justify-end">
          <LoadingButton type="submit" isLoading={isLoading}>
            Create Product
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
