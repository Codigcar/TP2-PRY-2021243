export function nameValidator(name: string) {
    if (!name) return "El nombre no puede estar vacío"
    if(name.match(/[^a-zA-Z]/)) return 'El nombre debe contener solo letras'
    return ''
}