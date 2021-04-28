import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const { addTransaction } = useContext(GlobalContext);

    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)
    const [transactionMsg, setTransactionMsg] = useState('')

    const clearTransactionMsg = () => {
        setTimeout(() => { setTransactionMsg('')}, 5000)
    }

    const confirmTransaction = () => {
        return (text.length > 0 && amount !== 0 ? true : false)
    }

    const submitTransaction = () => {
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction)

        const msg = text;
        setTransactionMsg(`Submitted ${msg} to account successfully!`)
        setText('')
        setAmount(0)
        clearTransactionMsg()
    }

    const badTransaction = () => {


        if (text.length < 1) {
            setTransactionMsg("Please enter a name for this transaction.")
            clearTransactionMsg()
        } else if (amount === 0) {
            setTransactionMsg("Please enter an amount for this transaction")
            clearTransactionMsg()
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        confirmTransaction() ? submitTransaction() : badTransaction();
    }

    return (
        <div>
            <h3>New Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Transaction</label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter name of transaction..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        <small>(Negative for expenses, postive for income)</small> <br />
                    </label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
                
                <div className={"transaction-msg"}>
                    {transactionMsg}
                </div>
            </form>
        </div>
    )
}
