import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreatePerson from "@/hooks/use-create-person";
import { ArrowLeft, UserPlus } from "lucide-react";

export const Route = createFileRoute("/add-person")({
  component: AddPerson,
});

function AddPerson() {
  const navigate = useNavigate();
  const createPerson = useCreatePerson();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; age?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 150) {
      newErrors.age = "Age must be a valid number between 0 and 150";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createPerson.mutateAsync({
        name: name.trim(),
        age: Number.parseInt(age),
      });

      // Navigate back to home page after successful creation
      navigate({ to: "/" });
    } catch (error) {
      console.error("Failed to create person:", error);
    }
  };

  return (
    <div className="flex flex-col bg-[#29ace2] p-10 rounded-xl text-white gap-6 w-full">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate({ to: "/" })}
          variant="ghost"
          size="icon"
          className="hover:bg-white/20"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Add New Person</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); }}
            placeholder="Enter person's name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-red-300 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="text-sm font-medium">
            Age
          </label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => { setAge(e.target.value); }}
            placeholder="Enter person's age"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            min="0"
            max="150"
            aria-invalid={!!errors.age}
          />
          {errors.age && (
            <span className="text-red-300 text-sm">{errors.age}</span>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            type="submit"
            variant="outline"
            className="flex-1 gap-2"
            disabled={createPerson.isPending}
          >
            <UserPlus className="h-4 w-4" />
            {createPerson.isPending ? "Creating..." : "Create Person"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate({ to: "/" })}
            className="flex-1 hover:bg-white/20"
            disabled={createPerson.isPending}
          >
            Cancel
          </Button>
        </div>

        {createPerson.isError && (
          <div className="bg-red-500/20 border border-red-400 rounded-md p-3 text-red-100">
            Failed to create person. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
