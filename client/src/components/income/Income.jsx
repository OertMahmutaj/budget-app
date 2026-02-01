import { useField } from "../../hooks/customHooks"
import { createNew } from '../../api/income'
import { useNavigate } from "react-router-dom"

const Income = () =>{
    const incomeField  = useField('number')
    const navigate = useNavigate()

    const handleSubmitIncome = async (event) =>{
        event.preventDefault()
        const savedIncome = await createNew(Number(incomeField.value))

        if(!savedIncome){
            throw new Error('user not here')
        } else {
            navigate('/dashboard')
        }
    }

    return(
        <div>
            <form className="incomeForm" onSubmit={handleSubmitIncome}>
                <input type="income" {...incomeField} />
                <button>Submit</button>
            </form>
        </div>
    )

}

export default Income