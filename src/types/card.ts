export type Card = {
  id: number;
  title: string;
  status: "To Do" | "Doing" | "Done";
  description?: string;
  due_date?: string | null;
};
