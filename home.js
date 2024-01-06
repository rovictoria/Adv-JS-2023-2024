import { saveDataToLS, getDataFromLS } from './src/modules/localStorageMethods.js';

// localStorage.clear();

const initialData = [
    {
        id: 'Apple iPhone 15',
        product: "Apple iPhone 15",
        reviews: [
            {
                id: 1,
                text: "Лайк, телефон огонь"
            },
            {
                id: 2,
                text: "Ну не знаю... что 12, что 15",
            },
        ],
    },
    {
        id: 'Apple iPhone 14',
        product: "Apple iPhone 14",
        reviews: [
            {
                id: 3,
                text: "Обновился с десятки, супер",
            },
        ],
    },
    {
        id: 'Apple iPhone 13 Pro Max',
        product: "Apple iPhone 13 Pro Max",
        reviews: [
            {
                id: 4,
                text: "Телефон хороший, мне нравится",
            },
        ],
    },
    {
        id: 'Samsung Galaxy Z Flip 5',
        product: "Samsung Galaxy Z Flip 5",
        reviews: [
            {
                id: 5,
                text: "Классный дизайн, щёлкаю как в нулевых",
            }

        ],
    },
    {
        id: 'Sony PlayStation 5',
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: 6,
                text: "Графика хорошая, игры тянет как надо, без задержек",
            }

        ],
    },
];

saveDataToLS('reviewsOfDifferentProducts', initialData);


const makeReviewButton = document.querySelector('.addButton');
makeReviewButton.addEventListener("click", (event) => {
    event.preventDefault();

    let textOfReview = getReviewText();

    createNewReview(textOfReview);
    resetForm();
});


function resetForm() {
    const nameInput = document.querySelector(`[name="productname"]`)
    nameInput.value = '';

    const textArea = document.querySelector('.textarea')
    textArea.value = '';
}


function getProductName() {
    const productName = document.querySelector('input[name="productname"]');
    try {
        if (productName) {
            return productName.value;
        } else {
            throw new Error('Вы не выбрали товар для отзыва!');
        }
    } catch (error) {
        console.log(error);
    }
}

function getReviewText() {
    const textArea = document.querySelector('.textarea').value.trim();
    try {
        if (textArea.length < 50) {
            throw new Error('Комментарий слишком короткий');
        }
        else if (textArea.length > 500) {
            throw new Error('Комментарий слишком длинный');
        } else {
            return textArea;
        }
    } catch (error) {
        console.log(error);
    }
}

let globalId = 7;
function createNewReview(text) {
    if (text) {
        let newReview = {
            id: ++globalId,
            text: text
        }
        saveNewReview(newReview);
    }
}

function saveNewReview(review) {
    let nameOfProduct = getProductName();
    console.log(nameOfProduct);
    const reviewForSaving = review;
    console.log(reviewForSaving);

    const productsArrayWithReviews = getDataFromLS('reviewsOfDifferentProducts');
    const targetProductIndex = productsArrayWithReviews.findIndex(product => product.product === nameOfProduct);
    console.log(targetProductIndex);
    if (targetProductIndex >= 0) {
        productsArrayWithReviews[targetProductIndex].reviews.push(reviewForSaving);
        saveDataToLS('reviewsOfDifferentProducts', productsArrayWithReviews);

    } else {
        const fullReview = {
            id: nameOfProduct,
            product: nameOfProduct,
            reviews: [reviewForSaving],
        }
        console.log(fullReview);
        productsArrayWithReviews.push(fullReview);
        saveDataToLS('reviewsOfDifferentProducts', productsArrayWithReviews);
    }
}






