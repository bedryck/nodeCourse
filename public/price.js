document.querySelectorAll('.price').forEach(node => {
    node.textContent = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH'
    }).format(node.textContent)
})