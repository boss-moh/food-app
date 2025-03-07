import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type ListInputProps = {
  field: ControllerRenderProps<FieldValues, "ingredients">;
};

const ListInput = ({ field }: ListInputProps) => (
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
);
export default ListInput;
