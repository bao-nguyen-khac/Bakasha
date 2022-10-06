function formatCash(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default formatCash