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

interface PersonRowProps {
  person: Person;
}

function PersonRow({ person }: PersonRowProps) {
  const deletePerson = useDeletePerson();
  const updatePerson = useUpdatePerson();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditName(person.name);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName("");
  };

  const handleSaveEdit = async () => {
    if (!editName.trim()) return;

    try {
      await updatePerson.mutateAsync({
        id: person.id,
        name: [editName.trim()],
        age: [],
      });
      setIsEditing(false);
      setEditName("");
    } catch (error) {
      console.error("Failed to update person:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePerson.mutateAsync(person.id);
    } catch (error) {
      console.error("Failed to delete person:", error);
    }
  };

  return (
    <tr className="border-b border-white/10">
      <td className="py-4">
        {isEditing ? (
          <div className="pr-4 pl-1">
            <Input
              type="text"
              value={editName}
              onChange={(e) => {
                setEditName(e.target.value);
              }}
              className="bg-white/10 border-white/20 text-white h-8 text-xs"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  void handleSaveEdit();
                } else if (e.key === "Escape") {
                  handleCancelEdit();
                }
              }}
            />
          </div>
        ) : (
          person.name
        )}
      </td>
      <td className="py-4">{person.age}</td>
      <td className="py-4 text-right">
        {isEditing ? (
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => void handleSaveEdit()}
              variant="ghost"
              size="icon"
              disabled={updatePerson.isPending}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleCancelEdit}
              variant="ghost"
              size="icon"
              disabled={updatePerson.isPending}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <Button onClick={handleStartEdit} variant="ghost" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => void handleDelete()}
              variant="ghost"
              size="icon"
              disabled={deletePerson.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}

interface PersonsTableProps {
  persons: Person[];
}

function PersonsTable({ persons }: PersonsTableProps) {
  return (
    <div className="overflow-hidden text-xs">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-4 font-semibold">Name</th>
            <th className="text-left py-4 font-semibold">Age</th>
            <th className="text-right py-4 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <PersonRow key={person.id} person={person} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-white/70 flex flex-col gap-4 items-center">
      <div>No persons found. Add your first person!</div>
    </div>
  );
}

function LoadingState() {
  return <div className="text-white/70">Loading persons...</div>;
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-red-400">{message}</div>
    </div>
  );
}

function PersonsHeader() {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-2xl font-semibold">Persons</h3>
      <Link to="/add-person">
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Person
        </Button>
      </Link>
    </div>
  );
}

function PersonsContent() {
  const { data: result, isLoading, error } = useQueryPersons();
  const [persons, setPersons] = useState<Person[]>([]);

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message="Failed to load persons" />;
  }

  if (result && "Err" in result) {
    return <ErrorState message={`Error: ${result.Err}`} />;
  }

  if (persons.length === 0) {
    return <EmptyState />;
  }

  return <PersonsTable persons={persons} />;
}

export default function Persons() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <PersonsHeader />
      <PersonsContent />
    </div>
  );
}
