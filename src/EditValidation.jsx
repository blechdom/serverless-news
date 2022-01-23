const initialFormValues = {
    title: '',
    description: '',
    selectedFile: '',
    formSubmitted: false,
    success: false
}

export const useFormControls = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const validate = (values) => {}
    const handleInputValue = (values) => {}
    const handleFormSubmit = (e) => {}
    const formIsValid = () => {}
    return {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    }
}