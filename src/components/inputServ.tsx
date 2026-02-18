// Точная копия из методички
import './InputServ.css' // ВАЖНО: в той же папке что и компонент
interface Props {
    value: string
    setValue: (value: string) => void
    onSubmit: () => void
    loading?: boolean
    placeholder?: string
    buttonTitle?: string
}

const InputField = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Искать' }: Props) => (
    <div className="inputField">
        <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <button disabled={loading} onClick={onSubmit}>{buttonTitle}</button>
    </div>
)

export default InputField