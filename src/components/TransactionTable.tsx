'use client';
import { useEffect, useState } from 'react';

type Transaction = {
    id: string;
    date: string;
    amount: string;
    status: string;
};

export default function TransactionTable() {
    const [data, setData] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/transactionHistory')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="tableWrapper">
            <table className="table">
                <thead className="tableHeader">
                    <tr className='headerRow'>
                        <th className="headerCell">Transaction ID</th>
                        <th className="headerCell">Date</th>
                        <th className="headerCell">Amount</th>
                        <th className="headerCell">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((txn) => (
                        <tr key={txn.id} className="row">
                            <td className="cell">{txn.id}</td>
                            <td className="cell">{txn.date}</td>
                            <td className="cell">{txn.amount}</td>
                            <td className="cell">{txn.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
