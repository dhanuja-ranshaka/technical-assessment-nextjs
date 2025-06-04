import TransactionTable from "@/components/TransactionTable";

export default function DashboardPage() {
  return (
    <div className="p-10 text-center">
      <h2>Dashboard</h2>
      <TransactionTable />
    </div>
  );
}
