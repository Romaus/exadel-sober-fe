export default {
    backendURL: process.env.VUE_APP_backendURL,
    validateErrors: {
        required: {
            email: 'Email is required',
            name: 'Name is required',
            password: 'Password is required'
        },
        valid: {
            email: 'E-mail must be valid'
        },
        length: {
            name: 'Name must be less than 10 characters',
            password: 'Password must be less than 10 characters'
        }
    }
}