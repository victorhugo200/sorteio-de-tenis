const btn = document.querySelector('.btn');
const inputName = document.querySelector('input');
const wrapper = document.querySelector('.wrapper');
let listProduts = [];


const closeModal = () => {
    wrapper.classList.remove('show');
    resetInput();
}

const resetInput = () => inputName.value = '';

async function fetchProduct() {
    const response = await fetch('js/data/data.json');
    const productJson = await response.json();
    listProduts = [...productJson];
}

fetchProduct();

async function submitForm(event) {
    event.preventDefault();
    const name = inputName.value;
    if (name.length) {
        try {
            const indexRandom = Math.floor(listProduts.length * Math.random());
            const product = listProduts[indexRandom];
            rendererTemplate(name, product);
        } catch (error) {
            console.log(error);
        }
    } else {
        alert("Preencha seu nome no campo!");
    }
}

function rendererTemplate(name, product) {
    wrapper.classList.add('show');
    const productTemplate = template(name, product);
    wrapper.innerHTML = productTemplate;
    const close = document.querySelector('.produto > button');
    close.addEventListener('click', closeModal);
}

function template(name, product) {
    return `
        <div class="produto">
            <h1 class="produto__title">
                Parabéns ${name} !
            </h1>
            <p>Você ganhou um ${product.name}</p>
            <figure>
                <img src="${product.url}" alt="${product.name}">
            </figure>
            <button>X</button>
        </div>
    `;
}

wrapper.addEventListener('click', function(event) {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
        wrapper.classList.remove('show');
        resetInput();
    }
});
btn.addEventListener('click', submitForm);