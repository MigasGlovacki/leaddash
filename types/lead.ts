export type LeadStatus = "New" | "In Progress" | "Converted" | "Lost";

export interface Lead {
  id: number;
  name: string;
  email: string;
  status: LeadStatus;
  date: string; // Formatted date for display
  createdAt: Date; // Timestamp for sorting
}
