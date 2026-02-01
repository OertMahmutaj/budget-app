import { useField } from "../../hooks/customHooks"
import Notification from "../layout/Notification";
import { useState } from "react";

const SavingsForm = ({ addSavings }) =>{
    const percentage = useField('number')
    const [message, setMessage] = useState("");

    const handleSavingsPercentage = async (event) =>{
        event.preventDefault()

        const updatedSavings = {
        id: "1",
        percentage: Number(percentage.value),
        totalSaved: 0,
        dailySaved: 0
        }

        try {
            await addSavings(updatedSavings)
            setMessage(`Savings added`)
        } catch (err){
            setMessage(`Savings not added ${err}`)
        }
        setTimeout(() => setMessage(""), 3000);
    }

    return(
        <div>
            <Notification message={message} />
            <form onSubmit={handleSavingsPercentage}>
                <input {...percentage} />
                <button>Add new savings percentage</button>
            </form>
        </div>
    )

}
export default SavingsForm