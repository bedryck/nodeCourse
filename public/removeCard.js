/* eslint-disable no-unused-vars */
const cardDiv = document.getElementById('card')
function removeFromCard(e) {
    const id = e.target.dataset.id
    fetch('/card/remove/' + id, {
        method: 'delete'
    })
        .then(res => res.json())
        .then(card => {
            rerenderCard(card)

        })
}

function rerenderCard(card) {
    if (card.courses.length) {
        const html = card.courses.map(item => {
            return `
            <tr>
            <td>${item.title}</td>
            <td>${item.count}</td>
            <td>
                <button class="btn btn-small" id="courseRemoove" data-id="${item.id}"
                    onclick="removeFromCard(event)">Видалити</button>
            </td>
            </tr>
        `
        }).join('')
        cardDiv.querySelector('tbody').innerHTML = html
        cardDiv.querySelector('.price').textContent = new Intl.NumberFormat('uk-UA', {
            style: 'currency',
            currency: 'UAH'
        }).format(card.price)
    } else {
        cardDiv.innerHTML = '<p>Корзина пуста</p>'
    }

}