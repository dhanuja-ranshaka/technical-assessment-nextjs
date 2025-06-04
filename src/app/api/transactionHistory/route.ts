import { NextResponse } from 'next/server';

export async function GET() {
  const transactions = [
    { id: 'TXN001', date: '2025-06-01', amount: '$120.00', status: 'Completed' },
    { id: 'TXN002', date: '2025-06-02', amount: '$75.50', status: 'Pending' },
    { id: 'TXN003', date: '2025-06-03', amount: '$200.00', status: 'Failed' },
    { id: 'TXN004', date: '2025-07-01', amount: '$120.00', status: 'Completed' },
    { id: 'TXN005', date: '2025-08-02', amount: '$75.50', status: 'Pending' },
    { id: 'TXN006', date: '2025-09-03', amount: '$200.00', status: 'Failed' },
  ];

  return NextResponse.json(transactions);
}
