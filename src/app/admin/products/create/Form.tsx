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
import { createDishSchema, createDishType, API_END_POINT } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios, useMutation } from "@/lib";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { CategoriesSelecter } from "@/components/share";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
export default function CreateProductForm() {
  const form = useForm<createDishType>({
    resolver: zodResolver(createDishSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      rating: 0,
      ingredients: [""],
      nutritionalInfo: [""],
    },
  });
  // imageUrl: "",

  console.log(form.watch());

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async () =>
      await axios.post(API_END_POINT.PRODUCT.CREATE, form.getValues()),
    onError(error) {
      console.log("error", error);
    },
    onSuccess() {
      form.reset();
      toast({
        title: "New Dish has been created.",
      });
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }

    mutate();
  }

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

            <div className="grid grid-cols-3 gap-4">
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
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>rating</FormLabel>
                    <FormControl>
                      <Input
                        step="0.01"
                        placeholder="0.00"
                        type="number"
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
                  <CategoriesSelecter onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-72">
            <FormLabel>Product Image</FormLabel>
            <div className="mt-2 flex flex-col items-center gap-4">
              <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed">
                <Button variant="ghost" className="h-full w-full">
                  <div className="flex flex-col items-center gap-2">
                    <ImagePlus className="h-8 w-8" />
                    <span>Upload Image</span>
                  </div>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: JPEG, PNG, WebP
                <br />
                Maximum file size: 5MB
              </p>
            </div>
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

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </Form>
  );
}
