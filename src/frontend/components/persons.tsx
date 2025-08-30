import useQueryPersons from "@/hooks/use-query-persons";
import useDeletePerson from "@/hooks/use-delete-person";
import useUpdatePerson from "@/hooks/use-update-person";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, UserPlus, Edit2, Check, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface Person {
  id: number;
  name: string;
  age: number;
}

export default function Persons() {
  const { data: result, isSuccess, isLoading, error } = useQueryPersons();
  const deletePerson = useDeletePerson();
  const updatePerson = useUpdatePerson();
  const [persons, setPersons] = useState<Person[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (result && "Ok" in result) {
      try {
        setPersons(result.Ok);
      } catch (e) {
        console.error("Failed to parse persons:", e);
        setPersons([]);
      }
    }
  }, [result]);

  const handleDelete = async (id: number) => {
    try {
      await deletePerson.mutateAsync(id);
    } catch (error) {
      console.error("Failed to delete person:", error);
    }
  };

  const handleEdit = (person: Person) => {
    setEditingId(person.id);
    setEditName(person.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) {
      return;
    }

    try {
      await updatePerson.mutateAsync({
        id: editingId!,
        name: [editName.trim()],
        age: []
      });
      setEditingId(null);
      setEditName("");
    } catch (error) {
      console.error("Failed to update person:", error);
    }
  };


  if (isLoading) {
    return <div className="text-white/70">Loading persons...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-red-400">Failed to load persons</div>
      </div>
    );
  }

  if (!isSuccess) {
    return null;
  }

  if ("Err" in result) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="text-red-400">
          Error: {result.Err}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Persons</h3>
        <Link to="/add-person">
          <Button variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Person
          </Button>
        </Link>
      </div>

      {persons.length === 0 ? (
        <div className="text-center py-8 text-white/70 flex flex-col gap-4 items-center">
          <div>No persons found. Add your first person!</div>
        </div>
      ) : (
        <div className="bg-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-4 font-semibold">ID</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Age</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((person) => (
                <tr
                  key={person.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">{person.id}</td>
                  <td className="p-4">
                    {editingId === person.id ? (
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => { setEditName(e.target.value); }}
                        className="bg-white/10 border-white/20 text-white h-8"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveEdit();
                          } else if (e.key === "Escape") {
                            handleCancelEdit();
                          }
                        }}
                      />
                    ) : (
                      person.name
                    )}
                  </td>
                  <td className="p-4">{person.age}</td>
                  <td className="p-4 text-right">
                    {editingId === person.id ? (
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={handleSaveEdit}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-green-500/20 hover:text-green-300"
                          disabled={updatePerson.isPending}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-500/20"
                          disabled={updatePerson.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => { handleEdit(person); }}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-blue-500/20 hover:text-blue-300"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(person.id)}
                          variant="ghost"
                          size="icon"
                          className="hover:bg-red-500/20 hover:text-red-300"
                          disabled={deletePerson.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
