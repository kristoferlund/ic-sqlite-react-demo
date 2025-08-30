import Persons from "@/components/persons";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col bg-[#29ace2] p-10 rounded-xl items-center text-white gap-5 w-full max-w-4xl">
      <Persons />
    </div>
  );
}
